import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Unidade } from 'src/app/model/Unidade';
import { FornecedorService } from 'src/app/service/fornecedor.service';
import { UnidadeService } from 'src/app/service/unidade.service';

import { Fornecedor } from './../../../model/Fornecedor';
import { Produto } from './../../../model/Produto';
import { ProdutoService } from './../../../service/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html'
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;
  fornecedores: Fornecedor[];
  unidades: Unidade[];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private unidadeService: UnidadeService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      codigo: [''],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: [''],
      marca: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      quantidadeMinima: ['', [Validators.required, Validators.min(0)]],
      unidade: ['', [Validators.required]],
      fornecedor: ['', [Validators.required]]
    });

    this.loader.startBackground();

    const codigo = this.activatedRoute.snapshot.params.codigo;

    this.fornecedorService.listaTodos().subscribe(resp => {
      this.fornecedores = resp;
      this.unidadeService.listaTodos().subscribe(res => {
        this.unidades = res;
        this.produtoService.buscaPeloCodigo(codigo).subscribe(r => {
          this.produto = r;
          this.form.patchValue(this.produto);
          this.loader.stopBackground();
        });
      });
    });

  }

  editar() {
    this.loader.startBackground();

    this.produto.nome = this.form.get('nome').value;
    this.produto.descricao = this.form.get('descricao').value;
    this.produto.marca = this.form.get('marca').value;
    this.produto.quantidadeMinima = this.form.get('quantidadeMinima').value;
    this.produto.fornecedor = this.form.get('fornecedor').value;
    this.produto.unidade = this.form.get('unidade').value;

    this.produtoService.atualizar(this.produto).subscribe(
      res => {
        this.router.navigate(['/home/produto']);
        this.toastr.success('Produto ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar produto: ' + err.error.message);
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
