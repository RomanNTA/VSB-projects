package cz.sliva.nobodywebapi.mapper;

import cz.sliva.nobodywebapi.dto.BtsValuesDto;
import cz.sliva.nobodywebapi.entity.BtsValuesEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {BtsAdrMapper.class}
        // Používá BtsAdrMapper pro mapování BtsAdrEntity <-> BtsAdrDto
)

public interface BtsValuesMapper {

    // --- FROM DTO TO ENTITY ---
    // Když převádíme z DTO na Entitu, MapStruct musí vědět, jak vytvořit BtsAdrEntity z BtsAdrDto.
    // MapStruct to umí automaticky, pokud je BtsAdrMapper uveden v 'uses'.
    // Také musíme zajistit, že adrId z DTO se mapuje na id vazební entity.
    @Mapping(target = "btsAdrId.id", source = "adrId") // Mapuje adrId z DTO na ID v btsAdrId entity
    @Mapping(target = "btsAdrId", source = "btsAdr") // Mapuje vnořené DTO na vnořenou entitu
    BtsValuesEntity toEntity(BtsValuesDto btsValuesDto);


    // --- FROM ENTITY TO DTO ---
    // Když převádíme z Entity na DTO, chceme mapovat:
    // - btsAdrId.id (int z entity) na adrId (int v DTO)
    // - celou btsAdrId (BtsAdrEntity) na btsAdr (BtsAdrDto)
    @Mapping(target = "adrId", source = "btsAdrId.id") // Mapuje ID z entity na adrId v DTO
    @Mapping(target = "btsAdr", source = "btsAdrId") // Mapuje vnořenou entitu na vnořené DTO
    BtsValuesDto toDto(BtsValuesEntity btsValuesEntity);



}
