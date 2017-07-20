package br.com.andrecaetano.models;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class Task extends AbstractModel<Long> {

	public Task(){}
	
	public Task(String descricao,String status, Date dataCriacao, String nome ){
		
		this.nome = nome;
		this.descricao =  descricao;
		this.status = status;
		this.dataCriacao =  dataCriacao;
	}

	private String nome;
	private String descricao;
	private String status;
	private Date dataCriacao;
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	
	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}



}
