package cz.sliva.nobodywebapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BtsAdrDto {

    private int id;
    private String okres;
    private String adresa;

}
