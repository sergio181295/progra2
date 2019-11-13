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
	private Integer id;
	
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
	
	@Column(name = "FLG_ACTIVO")
	private Boolean activo;
	
	@Column(name = "FLG_ADMIN")
	private Boolean esAdministrador;
	
	@Column(name = "USUARIO")
	private String usuario;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "usuario", cascade = {
	    CascadeType.ALL
	}, orphanRemoval = true)
	@OrderBy("id ASC")
	private List<Telefono> telefonos;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "usuario", cascade = {
	    CascadeType.ALL
	}, orphanRemoval = true)
	@OrderBy("id ASC")
	private List<Pedido> pedidos;

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}

	public Integer getId() {
		return id;
	}

	public List<Telefono> getTelefonos() {
		return telefonos;
	}

	public void setTelefonos(List<Telefono> telefonos) {
		this.telefonos = telefonos;
	}

	public void setId(Integer id) {
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

	public Boolean getActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
	}

	public Boolean getEsAdministrador() {
		return esAdministrador;
	}

	public void setEsAdministrador(Boolean esAdministrador) {
		this.esAdministrador = esAdministrador;
	}
}
