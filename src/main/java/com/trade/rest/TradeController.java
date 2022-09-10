package com.trade.rest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.SystemUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.trade.dto.Currency;
import com.trade.dto.Root;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TradeController {
	
	//@Inject
	//TradeRestClient restClient;
	
	
	@GetMapping(value="tradeRequest/{fromSymbol}/{toSymbol}")
	public Root getTrades(@PathVariable String fromSymbol,@PathVariable String toSymbol) {
		//restClient.getTrades();
		System.out.println("****** Inside Trading App *******");
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		HttpEntity<String> entity = new HttpEntity<String>(headers);
		
		Map<String,String> params = new HashMap<String, String>();
		params.put("lang", "en");
		params.put("region", "US");
		ResponseEntity<String> data = restTemplate().exchange("https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol="+fromSymbol+"&to_symbol="+toSymbol+"&interval=60min&apikey=9YJ6C63O6I7TXBKR", HttpMethod.GET, entity, String.class);
		
		Root root = jsonParser(data.getBody()); //jsonConverter();
		
		
		return root;
		
	}
	
	private Root jsonConverter() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Root root = mapper.readValue(new File((SystemUtils.getUserDir().getAbsolutePath() + "/src/main/resources/templates/Sample1.json")), Root.class);
            
            System.out.println(root.toString());
            return root;
        } catch (IOException e) {
        	System.out.println(e.getMessage());
        }
		return null;
	}
	
	private Root jsonParser(String data) {
	
        	
        List<Currency> currencies = new ArrayList<Currency>();
		JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = (JsonObject) jsonParser.parse(data);
        JsonElement metadata = jsonObject.get("Meta Data");
        //String index = metadata.get("2. From Symbol").getAsString();
        String fromSymbol = metadata.getAsJsonObject().get("2. From Symbol").toString();
        String toSymbol = metadata.getAsJsonObject().get("3. To Symbol").toString();
        JsonElement timeSeriesData = jsonObject.get("Time Series FX (60min)");
        Set<Map.Entry<String, JsonElement>> entrySet = timeSeriesData.getAsJsonObject().entrySet();
        entrySet.parallelStream().forEach(entry -> {
            Currency curr = new Currency();
            curr.setTime(entry.getKey());
            curr.setFromSymbol(fromSymbol);
            curr.setToSymbol(toSymbol);
            curr.setHigh(entry.getValue().getAsJsonObject().get("2. high").getAsString());
            curr.setLow(entry.getValue().getAsJsonObject().get("3. low").getAsString());
            curr.setLast(entry.getValue().getAsJsonObject().get("4. close").getAsString());
            currencies.add(curr);
        });
        Root root = new Root();
        root.setCurrency(currencies);
        return root;
	}
	
	@Bean
	public RestTemplate restTemplate() {
	 
		SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
		factory.setConnectTimeout(3000);
		factory.setReadTimeout(3000);
		return new RestTemplate(factory);
	}

}
