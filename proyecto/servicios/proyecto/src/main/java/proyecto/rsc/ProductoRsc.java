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

import proyecto.ctrl.ProductoCtrl;
import proyecto.ent.Producto;

@RestController
@RequestMapping (path="/productos")
public class ProductoRsc {

	@Autowired
	private ProductoCtrl productoCtrl;
	
	@GetMapping
	public List<Producto> obtenerTodos() {
		List<Producto> listaList =  (List<Producto>) productoCtrl.findAll();
		return listaList;
	}
	
	@PutMapping
	public Producto guardar(@RequestBody Producto producto) {
		productoCtrl.save(producto);
		return producto;
	}
	
	@GetMapping(path = "/{id:[0-9]+}")
	public Producto obtenerId(@PathVariable("id") Integer id) {
		Producto producto = (Producto)productoCtrl.findById(id).get();
		return producto;
	}

	@DeleteMapping(path = "/{id:[0-9]+}")
	public Producto borrar(@PathVariable("id") Integer id) {
		Producto producto = (Producto)productoCtrl.findById(id).get();
		productoCtrl.deleteById(id);
		return producto;
	}
}
