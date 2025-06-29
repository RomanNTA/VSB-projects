package cz.sliva.nobodywebapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity(name = "Repository")
@Getter
@Setter
public class RepositoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String uuid;
    private String contextName;
    private String comments;
    private String fileName;

    //@Column(length = 1048576)
    @Lob
    private String json;

    private String typeSrc;
}
