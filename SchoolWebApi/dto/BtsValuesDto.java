package cz.sliva.nobodywebapi.dto;

import cz.sliva.nobodywebapi.entity.BtsAdrEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BtsValuesDto {

    private int Id;
    private int cellid;
    private int physcid;
    private int tac;
    private int band;
    private int bsmcid;
    private LocalDate datum;

    private int adrId;
    private BtsAdrEntity btsAdr;
}

