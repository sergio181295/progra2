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

import com.example.demo.ctrl.NewsCtrl;
import com.example.demo.ent.News;

@RestController
@RequestMapping (path="/news")
public class NewsRsc {
	@Autowired
	private NewsCtrl newsCtrl;
	
	@CrossOrigin
	@GetMapping
	public List<News> obtenerTodos() {
		List<News> listaList =  (List<News>) newsCtrl.findAll();
		return listaList;
	}
	
	@CrossOrigin
	@PostMapping
	public News guardar(@RequestBody News news) {
		newsCtrl.save(news);
		return news;
	}
	
	@CrossOrigin
	@PutMapping(path = "/{id:[0-9]+}")
	public News actulizar(@PathVariable("id") Integer id, @Valid @RequestBody News newsDetails) {
		News news = (News)newsCtrl.findById(id).get();
		news.setTITLE(newsDetails.getTITLE());
		news.setDESCRIPTION(newsDetails.getDESCRIPTION());
		news.setIMG(newsDetails.getIMG());
		News updateNews = newsCtrl.save(news);
		return updateNews;
	}
	
	@CrossOrigin
	@GetMapping(path = "/{id:[0-9]+}")
	public News obtenerId(@PathVariable("id") Integer id) {
		News news = (News)newsCtrl.findById(id).get();
		return news;
	}

	@CrossOrigin
	@DeleteMapping(path = "/{id:[0-9]+}")
	public News borrar(@PathVariable("id") Integer id) {
		News news = (News)newsCtrl.findById(id).get();
		newsCtrl.deleteById(id);
		return news;
	}
}
