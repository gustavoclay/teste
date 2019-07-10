package com.teste.teste.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.teste.teste.model.Documento;
import com.teste.teste.repository.DocumentoRepository;

@Service
public class DocumentoService {
	
	@Autowired
	DocumentoRepository repository;

	public Page<Documento> findAll(Pageable pageable) {
		return repository.findAll(pageable);
	}
	
	public List<Documento> findAllList() {
		return repository.findAll();
	}

	public Documento get(Long id) {
		return repository.getOne(id);
	}

	public Documento save(Documento documento) {
		return repository.save(documento);
	}

	public Documento update(Long id, Documento documento) {
		Documento documentoSalvo = repository.getOne(id);
		BeanUtils.copyProperties(documento, documentoSalvo, "id");
		return save(documentoSalvo);
	}

	public void delete(Long id) {
		repository.deleteById(id);
	}

}
