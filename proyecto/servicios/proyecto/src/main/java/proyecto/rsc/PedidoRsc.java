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

import proyecto.ctrl.PedidoCtrl;
import proyecto.ent.Pedido;

@RestController
@RequestMapping (path="/pedidos")
public class PedidoRsc {

	@Autowired
	private PedidoCtrl pedidoCtrl;
	
	@GetMapping
	public List<Pedido> obtenerTodos() {
		List<Pedido> listaList =  (List<Pedido>) pedidoCtrl.findAll();
		return listaList;
	}
	
	@PutMapping
	public Pedido guardar(@RequestBody Pedido pedido) {
		pedidoCtrl.save(pedido);
		return pedido;
	}
	
	@GetMapping(path = "/{id:[0-9]+}")
	public Pedido obtenerId(@PathVariable("id") Integer id) {
		Pedido pedido = (Pedido)pedidoCtrl.findById(id).get();
		return pedido;
	}

	@DeleteMapping(path = "/{id:[0-9]+}")
	public Pedido borrar(@PathVariable("id") Integer id) {
		Pedido pedido = (Pedido)pedidoCtrl.findById(id).get();
		pedidoCtrl.deleteById(id);
		return pedido;
	}
}
