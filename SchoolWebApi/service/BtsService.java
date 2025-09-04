package cz.sliva.nobodywebapi.service;

import cz.sliva.nobodywebapi.dto.BtsDto;
import cz.sliva.nobodywebapi.repository.BtsValuesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BtsService {

    private BtsValuesRepository btsValuesRepository;

    public BtsService(BtsValuesRepository btsValuesRepository) {
        this.btsValuesRepository = btsValuesRepository;
    }

    public List<BtsDto> getAll(){
        return btsValuesRepository.findAllFlatAndTransformed();
    }

    public BtsDto getByCellId(int cellId){
        return btsValuesRepository.findFlatAndTransformedByCellid(cellId);
    }

}

