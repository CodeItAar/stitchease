package com.example.StitchEase;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StitchEaseApplication {

	public static void main(String[] args) {
		// Load environment variables from .env file into Java System properties
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(StitchEaseApplication.class, args);
	}

}