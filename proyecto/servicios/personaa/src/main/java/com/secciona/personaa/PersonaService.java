package com.secciona.personaa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/persona")
public class PersonaService {

	@Autowired
	PersonaRepository personaRepository;
	
	@RequestMapping(value="/all",method=RequestMethod.GET)
	public List<Persona> getAll(){
		
		return null; //personaRepository.findAll();
	}
	
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public Persona savePersona(@RequestBody Persona persona) {
		return personaRepository.save(persona);
	}
	
	
}
