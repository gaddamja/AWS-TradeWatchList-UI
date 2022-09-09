package com.trade.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Stock {
	
	@JsonProperty("Index") 
    public String index;
    @JsonProperty("Symbol") 
    public String symbol;
    @JsonProperty("Last") 
    public String last;
    @JsonProperty("High") 
    public String high;
    @JsonProperty("Low") 
    public String low;
    @JsonProperty("Change") 
    public String change;
    @JsonProperty("ChangePercent") 
    public String changePercent;
    @JsonProperty("Time") 
    public String time;
	public String getIndex() {
		return index;
	}
	public void setIndex(String index) {
		this.index = index;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public String getLast() {
		return last;
	}
	public void setLast(String last) {
		this.last = last;
	}
	public String getHigh() {
		return high;
	}
	public void setHigh(String high) {
		this.high = high;
	}
	public String getLow() {
		return low;
	}
	public void setLow(String low) {
		this.low = low;
	}
	public String getChange() {
		return change;
	}
	public void setChange(String change) {
		this.change = change;
	}
	public String getChangePercent() {
		return changePercent;
	}
	public void setChangePercent(String changePercent) {
		this.changePercent = changePercent;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	@Override
	public String toString() {
		return "Stock [index=" + index + ", symbol=" + symbol + ", last=" + last + ", high=" + high + ", low=" + low
				+ ", change=" + change + ", changePercent=" + changePercent + ", time=" + time + "]";
	}
	
	

}
