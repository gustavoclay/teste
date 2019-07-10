import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Produto } from '../../../model/Produto';
import { FornecedorService } from '../../../service/fornecedor.service';
import { ProdutoService } from '../../../service/produto.service';
import { Fornecedor } from './../../../model/Fornecedor';
import { UnidadeService } from 'src/app/service/unidade.service';
import { Unidade } from 'src/app/model/Unidade';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html'
})
export class CriarProdutoComponent implements OnInit {

  form: FormGroup;
  fornecedores: Fornecedor[];
  unidades: Unidade[];

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private unidadeService: UnidadeService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.loader.startBackground();
    this.unidadeService.listaTodos().subscribe(res => {
      this.unidades = res;
    }, err => this.toastr.error('Erro ao carregar lista de unidades'));

    this.fornecedorService.listaTodos().subscribe(res => {
      this.fornecedores = res;
      this.loader.stopBackground();
    });

    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: [''],
      marca: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      quantidadeMinima: ['', [Validators.required, Validators.min(0)]],
      unidade: ['', [Validators.required]],
      fornecedor: ['', [Validators.required]]
    });
  }

  cadastrar() {
    this.loader.startBackground();
    const produto = new Produto();
    produto.nome = this.form.get('nome').value;
    produto.descricao = this.form.get('descricao').value;
    produto.marca = this.form.get('marca').value;
    produto.quantidadeMinima = this.form.get('quantidadeMinima').value;
    produto.fornecedor = this.form.get('fornecedor').value;
    produto.unidade = this.form.get('unidade').value;

    this.produtoService.criar(produto).subscribe(
      res => {
        this.router.navigate(['/home/produto']);
        this.toastr.success('Produto ' + res.codigo + ' - ' + res.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar produto: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  verificaValidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }

}
