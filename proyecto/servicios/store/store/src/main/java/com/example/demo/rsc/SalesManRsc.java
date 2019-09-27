package com.example.demo.rsc;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.ctrl.SalesManCtrl;
import com.example.demo.ent.SalesMan;

@RestController
@RequestMapping (path="/sales-man")
public class SalesManRsc {
	@Autowired
	private SalesManCtrl salesManCtrl;
	
	@CrossOrigin
	@GetMapping
	public List<SalesMan> obtenerTodos() {
		List<SalesMan> listaList =  (List<SalesMan>) salesManCtrl.findAll();
		return listaList;
	}
	
	@CrossOrigin
	@PostMapping
	public SalesMan guardar(@RequestBody SalesMan salesMan) {
		salesManCtrl.save(salesMan);
		return salesMan;
	}
	
	@CrossOrigin
	@PutMapping(path = "/{id:[0-9]+}")
	public SalesMan actulizar(@PathVariable("id") Integer id, @Valid @RequestBody SalesMan salesManDetails) {
		SalesMan salesMan = (SalesMan)salesManCtrl.findById(id).get();
		salesMan.setNAME(salesManDetails.getNAME());
		salesMan.setSURNAME(salesManDetails.getSURNAME());
		salesMan.setNICKNAME(salesManDetails.getNICKNAME());
		salesMan.setBIRTHDAY(salesManDetails.getBIRTHDAY());
		salesMan.setEMAIL(salesManDetails.getEMAIL());
		salesMan.setADDRESS(salesManDetails.getADDRESS());
		salesMan.setPASSWORD(salesManDetails.getPASSWORD());
		salesMan.setSTATE(salesManDetails.getSTATE());
		salesMan.setID_ROLE(salesManDetails.getID_ROLE());
		SalesMan updateSalesMan = salesManCtrl.save(salesMan);
		return updateSalesMan;
	}
	
	@CrossOrigin
	@GetMapping(path = "/{id:[0-9]+}")
	public SalesMan obtenerId(@PathVariable("id") Integer id) {
		SalesMan salesMan = (SalesMan)salesManCtrl.findById(id).get();
		return salesMan;
	}

	@CrossOrigin
	@DeleteMapping(path = "/{id:[0-9]+}")
	public SalesMan borrar(@PathVariable("id") Integer id) {
		SalesMan salesMan = (SalesMan)salesManCtrl.findById(id).get();
		salesManCtrl.deleteById(id);
		return salesMan;
	}

}
