package cz.sliva.nobodywebapi.service;

import cz.sliva.nobodywebapi.dto.BtsDto;
import cz.sliva.nobodywebapi.repository.BtsValuesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BtsService {

//    BtsValuesMapper btsValuesMapper;
    private BtsValuesRepository btsValuesRepository;

    public BtsService(BtsValuesRepository btsValuesRepository) {
        this.btsValuesRepository = btsValuesRepository;
    }

//
//    @Query("SELECT NEW cz.sliva.nobodywebapi.dto.BtsDto(" +
//            "bv.id, bv.cellid, bv.physcid, bv.tac, bv.band, bv.bsmcid, " +
//            "ba.okres, ba.adresa, bv.datum, bv.adrId" +
//            ") FROM BtsValuesEntity bv JOIN bv.btsAdrId ba WHERE bv.cellid = :cellid")
//    List<BtsDto> findFlatAndTransformedByCellid(@Param("cellid") int cellid);
//
//    @Query("SELECT NEW cz.sliva.nobodywebapi.dto.BtsDto(" +
//            "bv.id, bv.cellid, bv.physcid, bv.tac, bv.band, bv.bsmcid, " +
//            "ba.okres, ba.adresa, bv.datum, bv.adrId" + // Všimni si, že datum je přímo z bv, okres a adresa z ba
//            ") FROM BtsValuesEntity bv JOIN bv.btsAdrId ba") // Použij JOIN, abys měl/a přístup k ba (BtsAdrEntity)
//    List<BtsDto> findAllFlatAndTransformed();




    public List<BtsDto> getAll(){
        return btsValuesRepository.findAllFlatAndTransformed();
    }

    public BtsDto getByCellId(int cellId){
        return btsValuesRepository.findFlatAndTransformedByCellid(cellId);
    }



//    public List<BtsValuesDto> getAll(){
//
//        List<BtsValuesDto> btsValuesDtos = new ArrayList<>();
//        List<BtsValuesEntity> allGrades = btsValuesRepository.findAll();
//
//        for (BtsValuesEntity grade : allGrades) {
//            btsValuesDtos.add(btsValuesMapper.toDto(grade));
//        }
//        //gradeDtos = allGrades.stream().map(x -> gradeMapper.toDto(x)).toList();
//
//        return btsValuesDtos;
//    }
//
//    public BtsValuesDto addGrade(BtsValuesDto newGrade ){
//        BtsValuesEntity entitityToInsert = btsValuesMapper.toEntity(newGrade);
//
//        entitityToInsert.setAdrId(repositoryRepository.getReferenceById(newGrade.getStudentId()));
//
//        BtsValuesEntity savedEntity = btsValuesRepository.save(entitityToInsert);
//        return btsValuesMapper.toDto(savedEntity);
//    }










}
