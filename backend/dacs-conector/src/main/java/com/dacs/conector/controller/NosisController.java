package com.dacs.conector.controller;

import java.util.HashMap;
import java.util.Map;

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

import com.dacs.conector.dto.NosisResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/nosis/ar")
public class NosisController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/{documentNumber}")
    public ResponseEntity<Object> getByDni(@PathVariable("documentNumber") String documentNumber) {
        // Use Nosis search endpoint: POST https://informes.nosis.com/Home/Buscar?Texto={dni}
        String url = "https://informes.nosis.com/Home/Buscar";

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("Texto", documentNumber);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>("", headers);

        try {
            ResponseEntity<Map> resp = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.POST, entity, Map.class);

            NosisResponseDto dto = new NosisResponseDto();
            if (resp.getBody() != null) {
                Object entidades = resp.getBody().get("EntidadesEncontradas");
                if (entidades instanceof java.util.List) {
                    java.util.List list = (java.util.List) entidades;
                    if (!list.isEmpty() && list.get(0) instanceof java.util.Map) {
                        java.util.Map first = (java.util.Map) list.get(0);
                        Map<String, Object> data = new HashMap<>();
                        Object razon = first.get("RazonSocial");
                        Object documento = first.get("Documento");
                        data.put("fullName", razon != null ? razon.toString() : null);
                        data.put("document", documento != null ? documento.toString() : null);
                        dto.setData(data);
                    }
                }
                dto.setSignature(null);
            }

            return ResponseEntity.status(resp.getStatusCode()).body(dto);

        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            log.warn("Nosis API returned error: {} - {}", ex.getStatusCode(), ex.getResponseBodyAsString());
            Map<String, Object> err = new HashMap<>();
            err.put("status", ex.getStatusCode().value());
            err.put("message", ex.getStatusText());
            err.put("details", ex.getResponseBodyAsString());
            return ResponseEntity.status(ex.getStatusCode()).body(err);
        } catch (RestClientException ex) {
            log.error("Error calling Nosis API", ex);
            Map<String, Object> err = new HashMap<>();
            err.put("status", 500);
            err.put("message", "Error calling Nosis API");
            err.put("details", ex.getMessage());
            return ResponseEntity.status(500).body(err);
        }
    }
}
