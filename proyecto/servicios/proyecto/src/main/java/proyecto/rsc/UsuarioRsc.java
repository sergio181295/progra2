package proyecto.rsc;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@Autowired
    private EntityManager entityManager;
	
	@GetMapping
	public List<Usuario> obtenerTodos() {
		List<Usuario> listaList =  (List<Usuario>) usuarioCtrl.findAll();
		return listaList;
	}
	
	@PutMapping
	public Usuario guardar(@RequestBody Usuario usuario) throws Exception {
		String error = "";
		error += Utilidades.validarCampo(usuario.getPassword(), "Contraseña");
		error += Utilidades.validarCampo(usuario.getCorreo(), "Correo");
		error += Utilidades.validarCampo(usuario.getApellido(), "Apellido");
		error += Utilidades.validarCampo(usuario.getNombre(), "Nombre");
		error += Utilidades.validarCampo(usuario.getFechaNacimiento(), "Fecha de Nacimiento");
		error += Utilidades.validarCampo(usuario.getDireccionEntrega(), "Dirección de Entrega");
		
		if(usuario.getTelefonos() == null || usuario.getTelefonos().isEmpty()) {
			error += "Debe ingresar al menos 1 numero de teléfono.\n";
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
		
		if(usuario.getUsuario() == null || usuario.getUsuario().isEmpty()) {
			usuario.setUsuario(usuario.getId().toString());
			usuarioCtrl.save(usuario);
		}
		
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
	
	@SuppressWarnings("unchecked")
	@PutMapping(path = "/login")
	public Usuario login(@RequestBody Login login) throws Exception {

		String sql = "SELECT * FROM USUARIOS WHERE USUARIO = '"+login.usuario+ "'";
		List<Usuario> usuarios = entityManager.createNativeQuery(sql,Usuario.class).getResultList();
		if( usuarios == null || usuarios.isEmpty()) {
			throw new Error("El usuario no existe.");
		}
		
		Usuario usuario = usuarios.get(0);
		if(!usuario.getActivo()) {
			throw new Error("Usuario no activo.");
		}
		
		if(!usuario.getPassword().equals(login.password)) {
			throw new Error("Contraseña incorrecta.");
		}
		
		return usuario;
	}
	
	public static class Login {
		public String usuario;
		public String password;
	}
}
