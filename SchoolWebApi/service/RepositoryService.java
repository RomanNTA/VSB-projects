package cz.sliva.nobodywebapi.service;


//import cz.sliva.nobodywebapi.mapper.RepositoryMapper;

import cz.sliva.nobodywebapi.repository.RepositoryRepository;
import cz.sliva.nobodywebapi.repository.SelectRepositoryInfo;
import cz.sliva.nobodywebapi.repository.SelectRepositoryJson;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepositoryService {

    //private RepositoryMapper repositoryMapper;
    private RepositoryRepository repos;


//    @Autowired // ...  dává se to nad konstruktor a od jisté verze to není nutné.
//    public RepositoryService(RepositoryMapper repositoryMapper, RepositoryRepository repos) {
//        this.repositoryMapper = repositoryMapper;
//        this.repos = repos;
//    }


    public RepositoryService(RepositoryRepository repos) {
        this.repos = repos;
    }

    public List<SelectRepositoryInfo> getRepositoryHeaders() {
        return repos.findAllProjectedBy(SelectRepositoryInfo.class);
    }

    public SelectRepositoryInfo getRepositoryByUuidInfo(String uuid) {
        return repos.findByUuid(uuid, SelectRepositoryInfo.class).orElse(null);
    }

    public SelectRepositoryJson getRepositoryByUuidJson(String uuid) {
        return repos.findByUuid(uuid, SelectRepositoryJson.class).orElse(null);
    }



    //
//    public List<BtsAdrDto> getSubjects(){
//
//        List<BtsAdrDto> allSubjects = new ArrayList<>();
//        List<BtsAdrEntity> subjectEntities = btsAdrRepository.findAll();
//
//        for (BtsAdrEntity btsAdrEntity : subjectEntities) {
//            allSubjects.add(subjectMapper.toDto(btsAdrEntity));
//        }
//
//        return allSubjects;
//    }
//
//    public BtsAdrDto getSubject(int subjectId) {
//        return subjectMapper.toDto(btsAdrRepository.getReferenceById(subjectId));
//
//    }
//
//    public BtsAdrDto addSubject(BtsAdrDto newSubject){
//        BtsAdrEntity btsAdrEntity = subjectMapper.toEntity(newSubject);
//        BtsAdrEntity saveSubject = btsAdrRepository.save(btsAdrEntity);
//        return subjectMapper.toDto(saveSubject);
//    }
//
//
//    public BtsAdrDto editSubject(BtsAdrDto editSubject , int subjectId){
//
//        if (!btsAdrRepository.existsById(subjectId)){
//            throw new EntityNotFoundException("Subject with id " + subjectId + "was not found");
//        }
//        // Testovat zda odpovídají ID !!!!!!!!!!!!!!!
//        BtsAdrEntity entity = subjectMapper.toEntity(editSubject);
//        entity.setId(subjectId);
//        BtsAdrEntity saveSubject = btsAdrRepository.save(entity);
//        return subjectMapper.toDto(saveSubject);
//    }
//
//    public BtsAdrDto deleteSubject(int subjectId){
//
//        BtsAdrEntity deleteEntity = btsAdrRepository.findById(subjectId).orElseThrow(EntityNotFoundException::new);
//        BtsAdrDto deleteSubject = subjectMapper.toDto(deleteEntity);
//        btsAdrRepository.delete(deleteEntity);
//        return deleteSubject;
//    }


}
