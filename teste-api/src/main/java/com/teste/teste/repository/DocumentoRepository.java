package com.teste.teste.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teste.teste.model.Documento;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Long> {

}
