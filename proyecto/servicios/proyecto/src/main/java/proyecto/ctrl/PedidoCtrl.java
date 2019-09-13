package proyecto.ctrl;

import org.springframework.data.repository.CrudRepository;

import proyecto.ent.Pedido;

public interface PedidoCtrl extends CrudRepository<Pedido, Integer> {

}
