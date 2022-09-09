package com.trade.rest;


public class Stocks {

	public String name;
	public double lastPrice;
	public String symbol;
	public String marketcap;
	public Stocks(String name, double lastPrice, String symbol, String marketcap, String change, String image,
			double priceChange) {
		super();
		this.name = name;
		this.lastPrice = lastPrice;
		this.symbol = symbol;
		this.marketcap = marketcap;
		this.change = change;
		this.image = image;
		this.priceChange = priceChange;
	}
	public String change;
	public String image;
	public double priceChange;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getLastPrice() {
		return lastPrice;
	}
	public void setLastPrice(double lastPrice) {
		this.lastPrice = lastPrice;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public String getMarketcap() {
		return marketcap;
	}
	public void setMarketcap(String marketcap) {
		this.marketcap = marketcap;
	}
	public String getVolume() {
		return change;
	}
	public void setVolume(String change) {
		this.change = change;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public double getPriceChange() {
		return priceChange;
	}
	public void setPriceChange(double priceChange) {
		this.priceChange = priceChange;
	}
	
	
	
}
