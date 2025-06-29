package cz.sliva.nobodywebapi.repository;


import cz.sliva.nobodywebapi.entity.BtsAdrEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BtsAdrRepository extends JpaRepository<BtsAdrEntity,Integer> {

    //Optional<BtsAdrEntity> findByName(String name);

}
