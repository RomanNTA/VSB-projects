package org.cz.slivanta.weatherapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Condition{
    public String text;
    public String icon;
    public int code;
}
