package guillen.dao;

import org.springframework.data.repository.CrudRepository;

import guillen.model.Ticket;

public interface TicketDao extends CrudRepository<Ticket, Integer> {

}
