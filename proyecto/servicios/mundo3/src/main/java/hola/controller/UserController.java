package hola.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hola.repository.Ticket;
import hola.repository.TicketDao;
import hola.repository.UserRepository;

// make this as rest controller
@RestController
@RequestMapping (path="/user")
public class UserController {
	
	/*@Autowired
	UserRepository userRepository;
	
	//to test our service is up and running
	@GetMapping
	public String check() {
		return "Welcome to java inspires";
	}
	
	@GetMapping(path = "/getUsers")
	public List<String> getAllUserNames(){
		return userRepository.getAllUserNames();
	}*/
	
	
	@Autowired
	private TicketDao dao;
	
	@PostMapping(path = "/create")
	public String bookTicket(@RequestBody List<Ticket> tickets) {
		dao.saveAll(tickets);
		
		return "ticket booked: " + tickets.size();
	}
	
	@GetMapping(path = "/getUsers")
	public List<Ticket> getTickets() {
		List<Ticket> listaList =  (List<Ticket>) dao.findAll();
		
		return listaList;
	}
	
	@GetMapping(path = "/hola")
	public String getHola() {
		
		return "Hola Mundo!!";
	}

}
