package org.cz.slivanta.weatherapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherApiDto {

    public Location location;
    public Current current;
}

