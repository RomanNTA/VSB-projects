package cz.sliva.nobodywebapi.controller;

import cz.sliva.nobodywebapi.dto.BtsDto;
import cz.sliva.nobodywebapi.service.BtsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BtsController {

    BtsService btsservice;

    @Autowired
    public BtsController(BtsService btsservice) {
        this.btsservice = btsservice;
    }

    @GetMapping({"/Bts/all", "/Bts/all/"})
    public List<BtsDto> getAll(){
        return btsservice.getAll();
    }

    @GetMapping("/Bts/{cellid}")
    public BtsDto getByCellId(@PathVariable int cellid){
        return btsservice.getByCellId(cellid);
    }

//    @PostMapping("/grades/{gradeId}")
//    public BtsValuesDto addGrade(@RequestBody BtsValuesDto dto){
//        return gradeservice.addGrade(dto);
//    }
//
//    @PutMapping("/grades/{gradeId}")
//    public BtsValuesDto updateGrade(@PathVariable int gradeId, @RequestBody BtsValuesDto dto){
//        return gradeservice.editGrade(gradeId, dto);
//    }
//
//    @DeleteMapping("/grades/{gradeId}")
//    public BtsValuesDto deleteGrade(@PathVariable int gradeId){
//        return gradeservice.deleteGrade(gradeId);
//    }


}
