package com.ogotlife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class OgotlifeApplication {
    public static void main(String[] args) {
        SpringApplication.run(OgotlifeApplication.class, args);
    }
}
