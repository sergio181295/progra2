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
import proyecto.ent.Pedido;
import proyecto.ent.Producto;

@CrossOrigin(origins="*")
@RestController
@RequestMapping (path="/productos")
public class ProductoRsc {

	@Autowired
	private ProductoCtrl productoCtrl;
	
	@Autowired
    private EntityManager entityManager;
	
	@GetMapping
	public List<Producto> obtenerTodos() {
		List<Producto> listaList =  (List<Producto>) productoCtrl.findAll();
		return listaList;
	}
	
	@PutMapping
	public Producto guardar(@RequestBody Producto producto) {
		String error = "";
		error += Utilidades.validarCampo(producto.getNombre(), "nombre");
		error += Utilidades.validarCampo(producto.getCostoUnitario(), "costo unitario");
		error += Utilidades.validarCampo(producto.getDescripcion(), "descripcion");
		
		if(!error.isEmpty()) {
			throw new Error(error);
		}
		productoCtrl.save(producto);
		return producto;
	}
	
	@GetMapping(path = "/{id:[0-9]+}")
	public Producto obtenerId(@PathVariable("id") Integer id) {
		Producto producto = (Producto)productoCtrl.findById(id).get();
		return producto;
	}

	@SuppressWarnings("unchecked")
	@DeleteMapping(path = "/{id:[0-9]+}")
	public Producto borrar(@PathVariable("id") Integer id) {
		try {	
			String sql = "SELECT P.* FROM PEDIDOS P JOIN DET_PRODUCTO DET ON P.ID = DET.PEDIDO_ID WHERE DET.PRODUCTO_ID = " + id;
			List<Pedido> pedidos = entityManager.createNativeQuery(sql,Pedido.class).getResultList();
			if( pedidos.size() > 0) {
				throw new Error("El producto pertenece a uno o más pedidos.");
			}
			
			
			
			Producto producto = (Producto)productoCtrl.findById(id).get();
			productoCtrl.deleteById(id);
			return producto;
		} catch (Exception e) {
			throw new Error(e.getMessage());
		}
	}
}
