package cz.sliva.nobodywebapi.controller;

import cz.sliva.nobodywebapi.repository.SelectRepositoryInfo;
import cz.sliva.nobodywebapi.repository.SelectRepositoryJson;
import cz.sliva.nobodywebapi.service.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api")
public class RepositoryController {

    RepositoryService repositoryService;

    @Autowired
    public RepositoryController(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    @GetMapping({"/Repository/headers", "/Repository/headers/"})
    public List<SelectRepositoryInfo> getRepositoryHeaders() {
        return repositoryService.getRepositoryHeaders();
    }

    @GetMapping("/Repository/detail/{uuid}")
    public SelectRepositoryInfo getRepositoryInfo(@PathVariable String uuid ) {
        return repositoryService.getRepositoryByUuidInfo(uuid );
    }

    @GetMapping("/Repository/json/{uuid}")
    public SelectRepositoryJson getRepositoryJson(@PathVariable String uuid ) {
        return repositoryService.getRepositoryByUuidJson(uuid);
    }

}
