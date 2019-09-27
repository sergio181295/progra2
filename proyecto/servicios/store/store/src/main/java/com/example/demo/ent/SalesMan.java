package com.example.demo.ent;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="USER")
public class SalesMan {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID_SALESMAN")
	private int id;
	
	@Column
	private String NAME;
	
	@Column
	private String SURNAME;
	
	@Column
	private String NICKNAME;
	
	@Column
	private Date BIRTHDAY;
	
	@Column
	private String EMAIL;
	
	@Column
	private String ADDRESS;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNAME() {
		return NAME;
	}

	public void setNAME(String nAME) {
		NAME = nAME;
	}

	public String getSURNAME() {
		return SURNAME;
	}

	public void setSURNAME(String sURNAME) {
		SURNAME = sURNAME;
	}

	public String getNICKNAME() {
		return NICKNAME;
	}

	public void setNICKNAME(String nICKNAME) {
		NICKNAME = nICKNAME;
	}

	public Date getBIRTHDAY() {
		return BIRTHDAY;
	}

	public void setBIRTHDAY(Date bIRTHDAY) {
		BIRTHDAY = bIRTHDAY;
	}

	public String getEMAIL() {
		return EMAIL;
	}

	public void setEMAIL(String eMAIL) {
		EMAIL = eMAIL;
	}

	public String getADDRESS() {
		return ADDRESS;
	}

	public void setADDRESS(String aDDRESS) {
		ADDRESS = aDDRESS;
	}

	public String getPASSWORD() {
		return PASSWORD;
	}

	public void setPASSWORD(String pASSWORD) {
		PASSWORD = pASSWORD;
	}

	public Boolean getSTATE() {
		return STATE;
	}

	public void setSTATE(Boolean sTATE) {
		STATE = sTATE;
	}

	public int getID_ROLE() {
		return ID_ROLE;
	}

	public void setID_ROLE(int iD_ROLE) {
		ID_ROLE = iD_ROLE;
	}

	@Column
	private String PASSWORD;
	
	@Column
	private Boolean STATE;
	
	@Column
	private int ID_ROLE;
}
