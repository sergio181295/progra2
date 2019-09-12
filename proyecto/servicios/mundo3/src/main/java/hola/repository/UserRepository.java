package hola.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class UserRepository {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	public List<String> getAllUserNames() {
		List<String> usernameList = jdbcTemplate.queryForList("SELECT NOMBRE FROM ticket;", String.class);
		return usernameList;
	}

}
