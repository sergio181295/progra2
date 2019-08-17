package pilacola;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class Cola {
    Nodo cabeza = null;
    Nodo cola = null;
    String codigo = "";
    
    public Cola(Integer[] valores){
        for (Integer valor : valores) {
            push(valor);
        }
        System.out.println("Cola: "+pop().valor);
        System.out.println("Cola: "+pop().valor);
        System.out.println("Cola: "+pop().valor);
        pintar();
    }
    
    public void push(Integer valor){

        if(this.cabeza == null){
            this.cabeza = new Nodo(valor);
            this.cola = this.cabeza;
        }else{
            this.cola.siguiente = new Nodo(valor);
            this.cola.siguiente.anterior = cola;
            this.cola = this.cola.siguiente;
        }
    }
    
    public Nodo pop(){
        Nodo aux = cabeza;
        this.cabeza = this.cabeza.siguiente;
        this.cabeza.anterior = null;
        
        return aux;
    }
    
    private void pintar(){
        codigo ="";
        codigo += "digraph g{\n  rankdir=\"LR\" ";

        this.pintarNodos(cabeza);
        this.pintarApuntadores(cabeza);

        codigo+="}";

        FileWriter fichero = null;
        PrintWriter pw = null;

        String nombre = "cola";
        
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
        //System.out.println(codigo);

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
