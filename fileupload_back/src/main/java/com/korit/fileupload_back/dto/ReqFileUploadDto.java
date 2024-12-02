package com.korit.fileupload_back.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ReqFileUploadDto {
    private String title;
    private MultipartFile img;
}