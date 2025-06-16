package com.ogotlife.file;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.UUID;

import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileUploadController {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {
        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + (ext != null ? "." + ext : "");
        Path dir = Paths.get(uploadDir);
        if (!Files.exists(dir)) Files.createDirectories(dir);
        Path path = dir.resolve(filename);
        file.transferTo(path);
        return ResponseEntity.ok().body("/api/file/download/" + filename);
    }

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> download(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }
        org.springframework.core.io.Resource resource = new org.springframework.core.io.UrlResource(filePath.toUri());
        String contentType = Files.probeContentType(filePath);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(resource);
    }

    @GetMapping("/download/profile/{filename:.+}")
    public ResponseEntity<org.springframework.core.io.Resource> downloadProfile(@PathVariable String filename) throws IOException {
        java.nio.file.Path filePath = java.nio.file.Paths.get("uploads/profile").resolve(filename).normalize();
        if (!java.nio.file.Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }
        org.springframework.core.io.Resource resource = new org.springframework.core.io.UrlResource(filePath.toUri());
        String contentType = java.nio.file.Files.probeContentType(filePath);
        return ResponseEntity.ok()
                .contentType(org.springframework.http.MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(resource);
    }
}
