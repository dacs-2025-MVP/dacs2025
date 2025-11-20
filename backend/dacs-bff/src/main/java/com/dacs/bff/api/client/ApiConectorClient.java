package com.dacs.bff.api.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.dacs.bff.dto.ItemDto;

@FeignClient(
		name = "apiConectorClient", 
		url = "${feign.client.config.apiconectorclient.url}"
		)
public interface ApiConectorClient {

	   @GetMapping("/ping")
	   String ping();
	   @GetMapping("/items")
	   List<ItemDto> items();

	@GetMapping("/nosis/ar/{documentNumber}")
	java.util.Map<String, Object> nosisByDni(@PathVariable("documentNumber") String documentNumber);
}
