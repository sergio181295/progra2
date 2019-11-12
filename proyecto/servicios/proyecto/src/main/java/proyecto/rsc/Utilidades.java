package proyecto.rsc;

public class Utilidades {

	public static String validarCampo(Object valor, String campo) {
	    String error = "";

	    if (valor == null) {
	      error += "El campo '" + campo + "' es obligatorio. ";

	    } else if (valor instanceof Integer) {
	        if ((Integer) valor <= 0) {
	          error += "El campo '" + campo + "' debe ser mayor a 0. ";
	        }
	    }  else if (valor instanceof Double) {
	        if ((Double) valor <= 0) {
	        	error += "El campo '" + campo + "' debe ser mayor a 0. ";
	        }

	    } else if (valor instanceof String) {
	      if (((String) valor).isEmpty()) {
	    	  error += "El campo '" + campo + "' es obligatorio. ";
	      }

	    } 

	    return error;
	  }
}
