package tablahash;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class TablaHash {
  ListaSimple tabla[] = null;
  Integer tamano = 0;
  
  public TablaHash(Integer valores[]){
    this.tamano = 10;
    this.tabla = new ListaSimple[tamano];
    for (Integer valor : valores) {
      insertar(valor);
    }
    
    pintar();
  }
  
  public void insertar(Integer valor){
    Integer posicion = valor % 10;
    System.out.println(posicion + " - " + valor);
    if(this.tabla[posicion] == null){
      this.tabla[posicion] = new ListaSimple();
      this.tabla[posicion].insertar(valor);
    }else{
      this.tabla[posicion].insertar(valor);
    }
  }
  
  public void pintar(){
    String codigo = "digraph structs { \n "
        + " node [shape=record]; \n"
        + " tabla [shape=record,label=\"{Tabla Hash";
    
    for (int i = 0; i < tabla.length; i++) {
      if(tabla[i] != null){        
        codigo += "| {" + i + "|" + tabla[i].toString() + "}";
      }else{        
        codigo += "| {" + i + "| - }";
      }
    }
    
    codigo = codigo.replaceFirst("|", "");
    
    codigo += "}\"]; \n }";
    
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