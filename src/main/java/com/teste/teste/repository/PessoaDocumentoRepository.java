package com.teste.teste.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teste.teste.model.PessoaDocumento;

@Repository
public interface PessoaDocumentoRepository extends JpaRepository<PessoaDocumento, Long> {

}
