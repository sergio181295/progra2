package com.example.demo.ent;

import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="NOTIFICATION")
public class News {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID_NOTIFICATION")
	private int id;
	
	@Column
	private String TITLE;
	
	@Column
	private String DESCRIPTION;
	
	@Column
	private Blob IMG;



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTITLE() {
		return TITLE;
	}

	public void setTITLE(String tITLE) {
		TITLE = tITLE;
	}

	public String getDESCRIPTION() {
		return DESCRIPTION;
	}

	public void setDESCRIPTION(String dESCRIPTION) {
		DESCRIPTION = dESCRIPTION;
	}

	public Blob getIMG() {
		return IMG;
	}

	public void setIMG(Blob iMG) {
		IMG = iMG;
	}
}
