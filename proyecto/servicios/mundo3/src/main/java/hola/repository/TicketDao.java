package hola.repository;

import org.springframework.data.repository.CrudRepository;

import hola.repository.Ticket;

public interface TicketDao extends CrudRepository<Ticket, Integer> {

}
