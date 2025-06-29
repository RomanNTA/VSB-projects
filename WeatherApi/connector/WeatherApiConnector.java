package org.cz.slivanta.weatherapi.connector;

import org.cz.slivanta.weatherapi.City;
import org.cz.slivanta.weatherapi.dto.WeatherApiDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

public class WeatherApiConnector {

    private static String baseUrl = "http://api.weatherapi.com/v1/";
    private static String urlParams = "current.json?key=";
    private static String apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    private static String url = baseUrl + urlParams + apiKey + "&q=";

    public WeatherApiDto getWeatherForCity(City city) {
        RestTemplate template = new RestTemplate();
        URI uri = null;
        try {
            uri = new URI(url + city);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        ResponseEntity<WeatherApiDto> response = template.getForEntity(uri, WeatherApiDto.class);
        return response.getBody();
    }
}


