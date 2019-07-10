package com.teste.teste.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.teste.teste.model.PessoaDocumento;
import com.teste.teste.repository.PessoaDocumentoRepository;

@Service
public class PessoaDocumentoService {
	
	@Autowired
	PessoaDocumentoRepository repository;

	public Page<PessoaDocumento> findAll(Pageable pageable) {
		return repository.findAll(pageable);
	}
	
	public List<PessoaDocumento> findAllList() {
		return repository.findAll();
	}

	public PessoaDocumento get(Long id) {
		return repository.getOne(id);
	}

	public PessoaDocumento save(PessoaDocumento pessoaDocumento) {
		return repository.save(pessoaDocumento);
	}

	public PessoaDocumento update(Long id, PessoaDocumento pessoaDocumento) {
		PessoaDocumento pessoaDocumentoSalvo = repository.getOne(id);
		BeanUtils.copyProperties(pessoaDocumento, pessoaDocumentoSalvo, "id");
		return save(pessoaDocumentoSalvo);
	}

	public void delete(Long id) {
		repository.deleteById(id);
	}
	
}
