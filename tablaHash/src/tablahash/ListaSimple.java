package tablahash;

public class ListaSimple {
  Nodo cabeza = null;
  Nodo cola = null;
  
  public ListaSimple(){
    
  }
  
  public void insertar(Integer valor){
    if(this.cabeza == null){
      this.cabeza = new Nodo(valor);
      this.cola = cabeza;
    }else{
      this.cola.siguiente = new Nodo(valor);
      this.cola = this.cola.siguiente;
    }
  }
  
  @Override
  public String toString(){
    String codigo = "";
    Integer i = 0;
    Nodo nodo = cabeza;
    while (i < 6) {
      if(nodo != null){        
        codigo += "|" + nodo.valor;
        nodo = nodo.siguiente;
      }else{
        codigo += "| -";
      }
      i++;
    }
    codigo = codigo.substring(1, codigo.length());
    return codigo;
  }
}