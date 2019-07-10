package com.teste.teste.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.teste.teste.model.Pessoa;
import com.teste.teste.repository.PessoaRepository;

@Service
public class PessoaService {

	@Autowired
	PessoaRepository repository;

	public Page<Pessoa> findAll(Pageable pageable) {
		return repository.findAll(pageable);
	}

	public Pessoa get(Long id) {
		return repository.getOne(id);
	}

	public Pessoa save(Pessoa pessoa) {
		return repository.save(pessoa);
	}

	public Pessoa update(Long id ,Pessoa pessoa) {
		Pessoa pessoaSalva = repository.getOne(id);
		BeanUtils.copyProperties(pessoa, pessoaSalva, "id");
		return save(pessoaSalva);
	}

	public void delete(Long id) {
		repository.deleteById(id);
	}

}
