package proyecto.rsc;

import java.util.ArrayList;
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

import proyecto.ctrl.PedidoCtrl;
import proyecto.ent.DetalleProducto;
import proyecto.ent.Pedido;

@CrossOrigin(origins="*")
@RestController
@RequestMapping (path="/pedidos")
public class PedidoRsc {

	@Autowired
	private PedidoCtrl pedidoCtrl;
	
	@Autowired
    private EntityManager entityManager;
	
	@SuppressWarnings("unchecked")
	@GetMapping(path = "/{usuarioId:[0-9]+}")
	public List<Pedido> obtenerTodos(@PathVariable("usuarioId") Integer usuarioId) {
		String sql = "SELECT ID FROM PEDIDOS WHERE USUARIO_ID = " + usuarioId;
		List<Integer> ids = entityManager.createNativeQuery(sql,Pedido.class).getResultList();
		List<Pedido> lista = new ArrayList<>();
		if( ids != null && ids.size() > 0) {
			for (Integer aux : ids) {
				Pedido pedido = (Pedido)pedidoCtrl.findById(aux).get();
				lista.add(pedido);
			}
		}
		return lista;
	}
	
	@PutMapping
	public Pedido guardar(@RequestBody Pedido pedido) {
		
		String error = "";
		error += Utilidades.validarCampo(pedido.getNombre(), "nombre");
		error += Utilidades.validarCampo(pedido.getFechaEntrega(), "fecha de entrega");
		
		if(!error.isEmpty()) {
			throw new Error(error);
		}
		
		if(pedido.getDetalleProductos() == null || pedido.getDetalleProductos().isEmpty()) {
			throw new Error("El pedido debe tener al menos 1 producto.");
		}
		
		Double total = 0.0;
		for (DetalleProducto det : pedido.getDetalleProductos()) {
			total = (double) Math.round(det.getCantidad() * det.getProducto().getCostoUnitario());
		}
		pedido.setTotal(total);
		
		pedidoCtrl.save(pedido);
		return pedido;
	}
	
	@GetMapping(path = "/{usuarioId:[0-9]+}/{id:[0-9]+}")
	public Pedido obtenerId(@PathVariable("usuarioId") Integer usuarioId, @PathVariable("id") Integer id) {
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
