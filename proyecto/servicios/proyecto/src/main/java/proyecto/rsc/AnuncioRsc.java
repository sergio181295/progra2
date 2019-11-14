package proyecto.rsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto.ctrl.AnuncioCtrl;
import proyecto.ent.Anuncio;

@CrossOrigin(origins="*")
@RestController
@RequestMapping (path="/anuncios")
public class AnuncioRsc {

	@Autowired
	private AnuncioCtrl anuncioCtrl;
	
	@GetMapping
	public List<Anuncio> obtenerTodos() {
		List<Anuncio> listaList =  (List<Anuncio>) anuncioCtrl.findAll();
		return listaList;
	}
	
	@PutMapping
	public Anuncio guardar(@RequestBody Anuncio anuncio) {
		String error = "";
		error += Utilidades.validarCampo(anuncio.getTexto(), "Texto");

		if (!error.isEmpty()) {
			throw new Error(error);
		}
		
		anuncioCtrl.save(anuncio);
		return anuncio;
	}
	
	@GetMapping(path = "/{id:[0-9]+}")
	public Anuncio obtenerId(@PathVariable("id") Integer id) {
		Anuncio anuncio = (Anuncio)anuncioCtrl.findById(id).get();
		return anuncio;
	}

	@DeleteMapping(path = "/{id:[0-9]+}")
	public Anuncio borrar(@PathVariable("id") Integer id) {
		Anuncio anuncio = (Anuncio)anuncioCtrl.findById(id).get();
		anuncioCtrl.deleteById(id);
		return anuncio;
	}
}
