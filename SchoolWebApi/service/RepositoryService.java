package cz.sliva.nobodywebapi.service;

import cz.sliva.nobodywebapi.repository.RepositoryRepository;
import cz.sliva.nobodywebapi.repository.SelectRepositoryInfo;
import cz.sliva.nobodywebapi.repository.SelectRepositoryJson;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepositoryService {

    private RepositoryRepository repos;

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

}

