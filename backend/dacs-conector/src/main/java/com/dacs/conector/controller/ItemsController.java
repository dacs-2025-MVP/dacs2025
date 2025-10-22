package com.dacs.conector.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dacs.conector.dto.ItemDto;
import com.dacs.conector.service.ApiService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "items")
public class ItemsController {
	
	@Autowired
	private ApiService apiService; 


	
	@GetMapping(value = "")
    public  List<ItemDto> getItems() {
		log.info("Ingrese a homecontroller getItems");	
		return apiService.getItemList();
	
	}
	

	
}
