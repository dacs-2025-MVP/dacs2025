package com.dacs.conector.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.dacs.conector.dto.VerifikResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/verifik/ar")
public class VerifikController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${verifik.api.url:https://api.verifik.co/v2/ar/cedula}")
    private String verifikUrl;

    @Value("${verifik.api.token:}")
    private String verifikToken;

    @GetMapping("/{documentNumber}")
    public ResponseEntity<Object> getByDni(@PathVariable("documentNumber") String documentNumber) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(verifikUrl)
                .queryParam("documentType", "DNIAR")
                .queryParam("documentNumber", documentNumber);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (verifikToken != null && !verifikToken.isBlank()) {
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + verifikToken);
        }

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> resp = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.GET, entity, Map.class);

            VerifikResponseDto dto = new VerifikResponseDto();
            if (resp.getBody() != null) {
                Object data = resp.getBody().get("data");
                Object signature = resp.getBody().get("signature");
                dto.setData(data instanceof Map ? (Map<String, Object>) data : null);
                dto.setSignature(signature instanceof Map ? (Map<String, Object>) signature : null);
            }

            return ResponseEntity.status(resp.getStatusCode()).body(dto);

        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            // Bubble up HTTP status from Verifik with a JSON body containing the error details
            log.warn("Verifik API returned error: {} - {}", ex.getStatusCode(), ex.getResponseBodyAsString());
            Map<String, Object> err = new HashMap<>();
            err.put("status", ex.getStatusCode().value());
            err.put("message", ex.getStatusText());
            err.put("details", ex.getResponseBodyAsString());
            return ResponseEntity.status(ex.getStatusCode()).body(err);
        } catch (RestClientException ex) {
            log.error("Error calling Verifik API", ex);
            Map<String, Object> err = new HashMap<>();
            err.put("status", 500);
            err.put("message", "Error calling Verifik API");
            err.put("details", ex.getMessage());
            return ResponseEntity.status(500).body(err);
        }
    }
}
