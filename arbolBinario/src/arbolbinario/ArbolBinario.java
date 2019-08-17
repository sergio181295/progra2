package arbolbinario;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class ArbolBinario {
    
    public Nodo raiz = null;
    public String codigo = "";
    public List<Integer> listaOrden = new ArrayList<>();
    
    public ArbolBinario(Integer[] numeros){
        for (Integer numero : numeros) {
            raiz = insertar(raiz, numero);
        }
        this.pintar(0);
        this.pintar(1);
        this.pintar(2);
        this.pintar(3);
    }
    
    private Nodo insertar(Nodo nodo, Integer valor){
        if(nodo == null){
            return new Nodo(valor);
        }else{
            if(nodo.valor < valor){
                if(nodo.der == null){
                    nodo.der = new Nodo(valor);
                }else{
                    nodo.der = insertar(nodo.der, valor);
                }
            }else{
                if(nodo.izq == null){
                    nodo.izq = new Nodo(valor);
                }else{
                    nodo.izq = insertar(nodo.izq, valor);
                }
            }
        }
        return nodo;
    }
    
    private void pintar(int orden){
        codigo ="";
        codigo += "digraph g{\n";
        if(orden != 0){
            codigo += " rankdir=\"LR\" ";
        }

        if(orden == 0){//ARBOL
            this.pintarNodos(raiz);
            this.pintarApuntadores(raiz);
        }else{//INORDEN
            this.pintarOrden(raiz, orden);
            this.listaOrden.clear();
        }

        codigo+="}";

        FileWriter fichero = null;
        PrintWriter pw = null;

        String nombre = "arbol";
        if(orden == 1){//INORDEN
            nombre = "inorden";
        }else if (orden == 2){//PREORDEN
            nombre = "preorden";
        }else if (orden == 3){//POSTORDEN
            nombre = "postorden";
        }
        
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
             pintarNodos(n.izq);
             pintarNodos(n.der);
        }
    }

    void pintarApuntadores(Nodo n){
        if(n != null){
             if ((n.izq != null)){
                 codigo += "n"+(n.valor)+" -> n"+(n.izq.valor)+";\n";
             }
             if ((n.der != null)){
                 codigo += "n"+(n.valor)+" -> n"+(n.der.valor)+";\n";
             }

             pintarApuntadores(n.izq);
             pintarApuntadores(n.der);
        }
    }
    
    public void inorden(Nodo n){
        if(n.izq != null){
            inorden(n.izq);
        }
        this.listaOrden.add(n.valor);
        if(n.der != null){
            inorden(n.der);
        }
    }
    
    public void preorden(Nodo n){
        this.listaOrden.add(n.valor);
        if(n.izq != null){
            preorden(n.izq);
        }
        if(n.der != null){
            preorden(n.der);
        }
    }
    
    public void postorden(Nodo n){
        if(n.izq != null){
            postorden(n.izq);
        }
        if(n.der != null){
            postorden(n.der);
        }
        this.listaOrden.add(n.valor);
    }
    
    void pintarOrden(Nodo n, int orden){
        
        if(orden == 1){//INORDEN
            inorden(n);
        }else if (orden == 2){//PREORDEN
            preorden(n);
        }else{//POSTORDEN
            postorden(n);
        }
        
        codigo += "n"+(listaOrden.get(0))+"[label =\""+listaOrden.get(0)+"\"];\n";
        for (int i = 1; i < listaOrden.size(); i++) {
            codigo += "n"+(listaOrden.get(i))+"[label =\""+listaOrden.get(i)+"\"];\n";
            codigo += "n"+(listaOrden.get(i-1))+" -> n"+(listaOrden.get(i))+";\n";
        }
    }
}
