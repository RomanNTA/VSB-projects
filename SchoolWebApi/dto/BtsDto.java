package cz.sliva.nobodywebapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BtsDto {

    private int id;
    private int cellid;
    private int physcid;
    private int tac;
    private int band;
    private int bsmcid;
    private LocalDate datum;
    private String okres;
    private String adresa;
}

