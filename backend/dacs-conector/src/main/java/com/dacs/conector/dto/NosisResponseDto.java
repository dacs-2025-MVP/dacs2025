package com.dacs.conector.dto;

import java.util.Map;

public class NosisResponseDto {

    private Map<String, Object> data;
    private Map<String, Object> signature;

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public Map<String, Object> getSignature() {
        return signature;
    }

    public void setSignature(Map<String, Object> signature) {
        this.signature = signature;
    }
}
