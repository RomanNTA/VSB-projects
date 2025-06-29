package cz.sliva.nobodywebapi.mapper;

import cz.sliva.nobodywebapi.dto.BtsAdrDto;
import cz.sliva.nobodywebapi.entity.BtsAdrEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)


public interface BtsAdrMapper {

    BtsAdrEntity toEntity(BtsAdrDto btsAdrDto);
    BtsAdrDto toDto(BtsAdrEntity btsAdrEntity);




}
