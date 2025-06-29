package org.cz.slivanta.weatherapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class WeaDto {

    private String location;
    private String timestamp;
    private double tempCelsius;
    private String weatherDescription;
    private double windMps;
    private String windDir;
    private int humidity;
}
