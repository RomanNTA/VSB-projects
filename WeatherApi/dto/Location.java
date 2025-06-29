package org.cz.slivanta.weatherapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Location{
    public String name;
    public String region;
    public String country;
    public double lat;
    public double lon;
    public String tz_id;
    public int localtime_epoch;
    public String localtime;
}
