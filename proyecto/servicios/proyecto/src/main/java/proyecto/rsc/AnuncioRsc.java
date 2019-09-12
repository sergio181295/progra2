package proyecto.rsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto.ctrl.AnuncioCtrl;
import proyecto.ent.Anuncio;

@RestController
@RequestMapping (path="/anuncios")
public class AnuncioRsc {

	@Autowired
	private AnuncioCtrl anuncioCtrl;
	
	@PostMapping
	public Anuncio guardar(@RequestBody Anuncio anuncio) {
		anuncioCtrl.save(anuncio);
		
		return anuncio;
	}
	
	@GetMapping
	public List<Anuncio> obtenerTodos() {
		List<Anuncio> listaList =  (List<Anuncio>) anuncioCtrl.findAll();
		
		return listaList;
	}

}
