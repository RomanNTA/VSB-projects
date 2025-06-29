package cz.sliva.nobodywebapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "BtsValues")
@Getter
@Setter
public class BtsValuesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @ManyToOne   ... Anotace pro vazbu
//    @OneToMany   ... Dava se nad
//    @OneToOne
//    @ManyToMany

    private int cellid;
    private int physcid;
    private int tac;
    private int band;
    private int bsmcid;
    private LocalDate datum;

    private int adrId;
    @ManyToOne
    private BtsAdrEntity btsAdrId;

}
