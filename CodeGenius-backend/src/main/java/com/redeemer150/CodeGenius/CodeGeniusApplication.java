package com.redeemer150.CodeGenius;


import dev.langchain4j.community.store.embedding.redis.spring.RedisEmbeddingStoreAutoConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {RedisEmbeddingStoreAutoConfiguration.class})
@MapperScan("com.redeemer150.CodeGenius.mapper")
public class CodeGeniusApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeGeniusApplication.class, args);
    }

}
