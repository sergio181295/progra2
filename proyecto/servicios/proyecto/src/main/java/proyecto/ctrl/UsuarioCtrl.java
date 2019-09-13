package proyecto.ctrl;

import org.springframework.data.repository.CrudRepository;

import proyecto.ent.Usuario;

public interface UsuarioCtrl extends CrudRepository<Usuario, Integer> {

}
