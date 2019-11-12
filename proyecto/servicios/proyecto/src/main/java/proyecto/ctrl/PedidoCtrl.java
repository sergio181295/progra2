package proyecto.ctrl;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import proyecto.ent.Pedido;

public interface PedidoCtrl extends CrudRepository<Pedido, Integer> {

//	@Query(value = "SELECT COUNT(*) FROM Pedido P JOIN DetalleProducto DET ON P.id = DET.pedidoId WHERE DET.productoId = ?1",nativeQuery=true)
//	public Integer findByProducto(Integer productoId);
}
