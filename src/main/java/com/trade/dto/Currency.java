package com.trade.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

@lombok.Data
public class Currency {
	
	@JsonProperty("FromSymbol") 
    public String fromSymbol;
    @JsonProperty("ToSymbol") 
    public String toSymbol;
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
	
	@Override
	public String toString() {
		return "Stock [fromSymbol=" + fromSymbol + ", toSymbol=" + toSymbol + ", last=" + last + ", high=" + high + ", low=" + low
				+ ", change=" + change + ", changePercent=" + changePercent + ", time=" + time + "]";
	}
	
	

}
