package com.korit.fileupload_back.exception;

import lombok.Getter;

import java.util.Map;

public class MemberInsertException extends RuntimeException{

    @Getter
    private Map<String, Object> errorMap;


    public MemberInsertException(String message, Map<String, Object> errormap) {
        super(message);
        this.errorMap = errormap;
    }
}
