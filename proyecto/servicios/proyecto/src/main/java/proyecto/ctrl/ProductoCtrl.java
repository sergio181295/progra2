package proyecto.ctrl;

import org.springframework.data.repository.CrudRepository;

import proyecto.ent.Producto;

public interface ProductoCtrl extends CrudRepository<Producto, Integer> {

}
