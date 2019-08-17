package listasimple;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class ListaSimple {
    Nodo cabeza = null;
    Nodo cola = null;
    String codigo = "";
    
    public ListaSimple(Integer[] valores){
        for (Integer valor : valores) {
            this.cabeza = insertar(this.cabeza,valor);
        }
        borrar(0);
        pintar();
    }
    
    public Nodo insertar(Nodo nodo, Integer valor){
        
        if (nodo == null) {
            nodo = new Nodo(valor);
        }else{
            nodo.siguiente = insertar(nodo.siguiente, valor);
        }
        
        return nodo;
    }
    
    public void insertar2(Integer valor){

        if(this.cabeza == null){
            this.cabeza = new Nodo(valor);
            this.cola = this.cabeza;
        }else{
            this.cola.siguiente = new Nodo(valor);
            this.cola = this.cola.siguiente;
        }
    }
    
    public void borrar(Integer valor){
        Nodo nodo = this.cabeza;
        if(nodo.valor.equals(valor)){
            this.cabeza = this.cabeza.siguiente;
        }else{
            while (nodo.siguiente != null) {            
                if(nodo.siguiente.valor.equals(valor)){
                    nodo.siguiente = nodo.siguiente.siguiente;
                    break;
                }
                nodo = nodo.siguiente;
            }
        }
    }
    
    private void pintar(){
        codigo ="";
        codigo += "digraph g{\n  rankdir=\"LR\" ";

        this.pintarNodos(cabeza);
        this.pintarApuntadores(cabeza);

        codigo+="}";

        FileWriter fichero = null;
        PrintWriter pw = null;

        String nombre = "lista";
        
        try {
            fichero = new FileWriter(nombre+".txt");
            pw = new PrintWriter(fichero);
            pw.write(codigo);
            pw.close();
            fichero.close();
        } catch (IOException e) {
            System.out.println("Error al tratar de escribir el archivo: " + e.getMessage());
        } finally {
            try {

            } catch (Exception e) {
                System.out.println("No se pudo cerrar el archivo: " + e.getMessage());
            }

        }
        System.out.println(codigo);

        codigo = "";

        try {
            ProcessBuilder pbuilder;
           
            pbuilder = new ProcessBuilder( "dot", "-Tpng", nombre+".txt", "-o", nombre+".png" );
            
            pbuilder.redirectErrorStream(true);

            pbuilder.start();  

            pbuilder = new ProcessBuilder( "shotwell", nombre+".png");
            pbuilder.redirectErrorStream(true);

            pbuilder.start();   

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    void pintarNodos(Nodo n){
        if(n != null){
             codigo += "n"+(n.valor)+"[label =\""+n.valor+"\"];\n";
             pintarNodos(n.siguiente);
        }
    }

    void pintarApuntadores(Nodo n){
        if(n != null){
             if ((n.siguiente != null)){
                 codigo += "n"+(n.valor)+" -> n"+(n.siguiente.valor)+";\n";
             }
             pintarApuntadores(n.siguiente);
        }
    }
}
