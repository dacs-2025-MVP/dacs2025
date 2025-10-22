package com.dacs.conector.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dacs.conector.api.client.ApiClient;
import com.dacs.conector.dto.ItemDto;
import com.dacs.conector.exeptions.ConectorException;
import com.dacs.conector.exeptions.ErrorEnum;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ApiServiceImpl implements ApiService{

	
	@Autowired
	private ApiClient apiClient;
	
	@Override
	public List<ItemDto> getItemList() {

		try {
			return apiClient.todos();
		} catch (Exception e) {
			log.error("Error en getItemList", e);
			throw new ConectorException(ErrorEnum.ERROR_API,e.getMessage());

		}
	}

	

}
