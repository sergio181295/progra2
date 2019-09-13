package proyecto.ent;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="USUARIOS")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int id;
	
	@Column(name = "CORREO")
	private String correo;
	
	@Column(name = "NOMBRE")
	private String nombre;
	
	@Column(name = "APELLIDO")
	private String apellido;
	
	@Column(name = "FECHA_NAC")
	private Date fechaNacimiento;
	
	@Column(name = "DIR_ENTREGA")
	private String direccionEntrega;
	
	@Column(name = "PASSWORD")
	private String password;
	
	@Column(name = "FLG_ACTIVO_INACTIVO")
	private Integer activoInactivo;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "usuario", cascade = {
	    CascadeType.ALL
	}, orphanRemoval = true)
	@OrderBy("id ASC")
	private List<Telefono> detalleTelefonos;

	public int getId() {
		return id;
	}

	public List<Telefono> getDetalleTelefonos() {
		return detalleTelefonos;
	}

	public void setDetalleTelefonos(List<Telefono> detalleTelefonos) {
		this.detalleTelefonos = detalleTelefonos;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public String getDireccionEntrega() {
		return direccionEntrega;
	}

	public void setDireccionEntrega(String direccionEntrega) {
		this.direccionEntrega = direccionEntrega;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getActivoInactivo() {
		return activoInactivo;
	}

	public void setActivoInactivo(Integer activoInactivo) {
		this.activoInactivo = activoInactivo;
	}
}
