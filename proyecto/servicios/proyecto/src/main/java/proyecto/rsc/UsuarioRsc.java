package proyecto.rsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto.ctrl.UsuarioCtrl;
import proyecto.ent.Usuario;

@RestController
@RequestMapping (path="/usuarios")
public class UsuarioRsc {

	@Autowired
	private UsuarioCtrl usuarioCtrl;
	
	@GetMapping
	public List<Usuario> obtenerTodos() {
		List<Usuario> listaList =  (List<Usuario>) usuarioCtrl.findAll();
		return listaList;
	}
	
	@PutMapping
	public Usuario guardar(@RequestBody Usuario usuario) {
		usuarioCtrl.save(usuario);
		return usuario;
	}
	
	@GetMapping(path = "/{id:[0-9]+}")
	public Usuario obtenerId(@PathVariable("id") Integer id) {
		Usuario usuario = (Usuario)usuarioCtrl.findById(id).get();
		return usuario;
	}

	@DeleteMapping(path = "/{id:[0-9]+}")
	public Usuario borrar(@PathVariable("id") Integer id) {
		Usuario usuario = (Usuario)usuarioCtrl.findById(id).get();
		usuarioCtrl.deleteById(id);
		return usuario;
	}
}
