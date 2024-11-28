package com.example.salhuman;

import com.example.salhuman.security.services.UserServiceImp;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SalhumanApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalhumanApplication.class, args);
    }

//    @Bean
    public CommandLineRunner commandLineRunner(UserServiceImp userServiceImp){
        return  args -> {
            userServiceImp.createUser("admin@gmail.com","123","ADMIN","admin");

        };
    }

}
