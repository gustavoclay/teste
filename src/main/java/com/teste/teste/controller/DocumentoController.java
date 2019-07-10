package com.teste.teste.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.teste.teste.model.Documento;
import com.teste.teste.service.DocumentoService;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {

	@Autowired
	private DocumentoService service;

	@GetMapping
	public Page<Documento> findAll(@RequestParam int pag, @RequestParam int max) {
		return service.findAll(PageRequest.of(pag, max));
	}

	@GetMapping("/lista")
	public List<Documento> findAll() {
		return service.findAllList();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Documento> findById(@PathVariable long id) {
		Documento documento = service.get(id);
		return documento != null ? ResponseEntity.ok(documento) : ResponseEntity.noContent().build();
	}

	@PostMapping
	public ResponseEntity<Documento> save(@RequestBody Documento documento) {
		Documento documentoSalvo = service.save(documento);
		return ResponseEntity.status(HttpStatus.CREATED).body(documentoSalvo);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long id) {
		service.delete(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Documento> atualizar(@PathVariable Long id, @Valid @RequestBody Documento documento) {
		Documento documentoSalvo = service.update(id, documento);
		return ResponseEntity.ok(documentoSalvo);
	}

}
