package com.trade.rest;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Root {
	
	@JsonProperty("Stock") 
    public List<Stock> stock;

	public List<Stock> getStock() {
		return stock;
	}

	public void setStock(List<Stock> stock) {
		this.stock = stock;
	}

	@Override
	public String toString() {
		return "Root [stock=" + stock + "]";
	}

	
	
	
	
}
