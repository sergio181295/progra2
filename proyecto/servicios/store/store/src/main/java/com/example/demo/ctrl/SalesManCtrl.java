package com.example.demo.ctrl;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.ent.SalesMan;

public interface SalesManCtrl extends CrudRepository<SalesMan, Integer> {

}
