package listasimple;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class ListaSimpleCircular {
    Nodo cabeza = null;
    Nodo cola = null;
    String codigo = "";
    
    public ListaSimpleCircular(Integer[] valores){
        for (Integer valor : valores) {
            //this.cabeza = insertar(this.cabeza,valor);
            insertar2(valor);
        }
        borrar(0);
        pintar();
    }
    
    public void insertar2(Integer valor){

        if(this.cabeza == null){
            this.cabeza = new Nodo(valor);
            this.cola = this.cabeza;
        }else{
            this.cola.siguiente = new Nodo(valor);
            this.cola = this.cola.siguiente;
        }
        this.cola.siguiente = this.cabeza;
    }
    
    public void borrar(Integer valor){
        Nodo nodo = this.cabeza;
        if(nodo.valor.equals(valor)){
            this.cabeza = this.cabeza.siguiente;
            this.cola.siguiente = this.cabeza;
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
        codigo += "digraph g{\n  rankdir=\"LR\" \n";
        
        codigo += "n"+(this.cabeza.valor)+"[label =\""+this.cabeza.valor+"\"];\n";
        Nodo nodo = this.cabeza.siguiente;
        while (!nodo.equals(cabeza)) {            
            codigo += "n"+(nodo.valor)+"[label =\""+nodo.valor+"\"];\n";
            System.out.println(nodo.valor);
            nodo = nodo.siguiente;
        }
        
        codigo += "n"+(this.cabeza.valor)+" -> n"+(this.cabeza.siguiente.valor)+";\n";
        nodo = this.cabeza.siguiente;
        while (!nodo.equals(cabeza)) {            
            codigo += "n"+(nodo.valor)+" -> n"+(nodo.siguiente.valor)+";\n";
            nodo = nodo.siguiente;
        }

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
}
