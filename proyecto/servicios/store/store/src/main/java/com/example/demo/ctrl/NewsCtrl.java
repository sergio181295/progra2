package com.example.demo.ctrl;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.ent.News;


public interface NewsCtrl extends CrudRepository<News, Integer> {

}
