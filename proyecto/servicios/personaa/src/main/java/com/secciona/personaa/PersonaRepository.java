package com.secciona.personaa;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PersonaRepository extends JpaRepository<Persona,Serializable>{
	
	public void pruebaImpl(Integer id);
	
}
