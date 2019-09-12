package proyecto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping (path="/hola-mundo")
public class Recursos {

	@GetMapping
	public String getHola() {
		return "Hola Mundo!!";
	}
}
