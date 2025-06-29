package org.cz.slivanta.weatherapi.service;

import org.cz.slivanta.weatherapi.City;
import org.cz.slivanta.weatherapi.connector.WeatherApiConnector;
import org.cz.slivanta.weatherapi.dto.WeaDto;
import org.cz.slivanta.weatherapi.dto.WeatherApiDto;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {

    public WeaDto getWeatherForCity(City city){
        WeatherApiConnector connector = new WeatherApiConnector();
        WeatherApiDto  weatherApiDto = connector.getWeatherForCity(city);
        WeaDto weaDto = transformDto(weatherApiDto);
        return weaDto;
    }

    private WeaDto transformDto(WeatherApiDto wad) {
        WeaDto wd = new WeaDto();
        wd.setHumidity(wad.getCurrent().getHumidity());
        wd.setLocation(wad.getLocation().getName());
        wd.setTimestamp(wad.getCurrent().getLast_updated());
        wd.setWeatherDescription(wad.getCurrent().getCondition().getText());
        wd.setWindDir(wad.getCurrent().getWind_dir());
        wd.setWindMps(wad.getCurrent().getWind_kph()/3.6);
        wd.setTempCelsius(wad.getCurrent().getTemp_c());
        return wd;
    }

}
