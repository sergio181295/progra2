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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import proyecto.ctrl.ProductoCtrl;
import proyecto.ctrl.UsuarioCtrl;
import proyecto.ent.DetalleProducto;
import proyecto.ent.Pedido;
import proyecto.ent.Producto;
import proyecto.ent.Usuario;

@CrossOrigin(origins="*")
@RestController
@RequestMapping (path="/usuarios")
public class UsuarioRsc {

	@Autowired
	private UsuarioCtrl usuarioCtrl;
	
	@Autowired
	private ProductoCtrl productoCtrl;
	
	@GetMapping
	public List<Usuario> obtenerTodos() {
		List<Usuario> listaList =  (List<Usuario>) usuarioCtrl.findAll();
		return listaList;
	}
	
	@PutMapping
	public Usuario guardar(@RequestBody Usuario usuario) throws Exception {
		String error = "";
		error += Utilidades.validarCampo(usuario.getPassword(), "contraseña");
		error += Utilidades.validarCampo(usuario.getCorreo(), "correo");
		error += Utilidades.validarCampo(usuario.getApellido(), "apellido");
		error += Utilidades.validarCampo(usuario.getNombre(), "nombre");
		error += Utilidades.validarCampo(usuario.getFechaNacimiento(), "fecha de nacimiento");
		error += Utilidades.validarCampo(usuario.getDireccionEntrega(), "direccion de entrega");
		
		if(usuario.getTelefonos() == null || usuario.getTelefonos().isEmpty()) {
			error += "Debe ingresar al menos 1 numero de teléfono.";
		}
		
		if(!error.isEmpty()) {
			throw new Error(error);
		}
		
		if(usuario.getActivo() == null) {
			usuario.setActivo(false);
		}
		if(usuario.getEsAdministrador() == null) {
			usuario.setEsAdministrador(false);
		}
		usuarioCtrl.save(usuario);
		return usuario;
	}
	
	@GetMapping(path = "/{id:[0-9]+}")
	public Usuario obtenerId(@PathVariable("id") Integer id) throws Exception {
		Usuario usuario = (Usuario)usuarioCtrl.findById(id).get();
		
		if(usuario == null) {
			throw new Exception("El usuario no existe.");
		}
		
		if(usuario.getPedidos() != null) {
			for (Pedido pedido : usuario.getPedidos()) {
				for (DetalleProducto det : pedido.getDetalleProductos()) {
					det.setProducto((Producto)productoCtrl.findById(det.getProductoId()).get());
				}
			}
		}
		
		return usuario;
	}

	@DeleteMapping(path = "/{id:[0-9]+}")
	public Usuario borrar(@PathVariable("id") Integer id) {
		Usuario usuario = (Usuario)usuarioCtrl.findById(id).get();
		usuarioCtrl.deleteById(id);
		return usuario;
	}
	
	@GetMapping(path = "/login")
	public Boolean login(@RequestParam(required = false) String password, @RequestParam(required = false) Integer usuarioId) throws Exception {
		Usuario usuario = (Usuario)usuarioCtrl.findById(usuarioId).get();
		
		if(usuario == null) {
			throw new Exception("El usuario no existe.");
		}
		
		if(usuario.getPassword().equals(password)) {
			return true;
		}

		return false;
	}
}
