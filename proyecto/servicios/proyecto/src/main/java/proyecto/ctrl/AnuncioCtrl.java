package proyecto.ctrl;

import org.springframework.data.repository.CrudRepository;

import proyecto.ent.Anuncio;

public interface AnuncioCtrl extends CrudRepository<Anuncio, Integer> {

}
