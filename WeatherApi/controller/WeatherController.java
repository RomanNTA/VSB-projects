package org.cz.slivanta.weatherapi.controller;

import io.swagger.v3.oas.annotations.Parameter;
import org.cz.slivanta.weatherapi.City;
import org.cz.slivanta.weatherapi.dto.WeaDto;
import org.cz.slivanta.weatherapi.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class WeatherController {

    WeatherService service;

    @Autowired
    public WeatherController(WeatherService service) {
        this.service = service;
    }

    @CrossOrigin // Musí být pro Azure !!!!!!!!!!!!!!!!!!!!! ... pošle hlavičky
    @GetMapping("/weather/{city}")
    public WeaDto getWeatherForCity(
            @PathVariable("city")
            @Parameter(name = "city", description = "Zadejte jedno z měst: Ostrava, Helsinky, Reykjavik, Sydney, Longyearbyen ")
            String city
    ) {
        return service.getWeatherForCity(City.valueOf(city.toUpperCase()));
    }


}
