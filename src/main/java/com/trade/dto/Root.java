package com.trade.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@lombok.Data
public class Root {
	
	@JsonProperty("Currency") 
    public List<Currency> currency;


	@Override
	public String toString() {
		return "Root [currency=" + currency + "]";
	}

	
	
	
	
}
