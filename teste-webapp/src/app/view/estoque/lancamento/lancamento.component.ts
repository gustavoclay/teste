import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Estoque } from 'src/app/model/Estoque';
import { Unidade } from 'src/app/model/Unidade';
import { ProdutoService } from 'src/app/service/produto.service';

import { EstoqueService } from '../../../service/estoque.service';
import { Despensa } from '../../../model/Despensa';
import { Produto } from '../../../model/Produto';
import { DespensaService } from '../../../service/despensa.service';
import { UnidadeService } from '../../../service/unidade.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html'
})
export class LancamentoComponent implements OnInit {

  form: FormGroup;
  despensas: Despensa[];
  produtos: Produto[];
  unidades: Unidade[];
  estoque: Estoque;

  constructor(
    private formBuilder: FormBuilder,
    private estoqueService: EstoqueService,
    private produtoService: ProdutoService,
    private despensaService: DespensaService,
    private unidadeService: UnidadeService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {

    this.produtoService.listaTodos().subscribe(res => {
      this.produtos = res;
    }, err => this.toastr.error('Erro ao carregar lista de produtos'));
    this.despensaService.listaTodos().subscribe(res => {
      this.despensas = res;
    }, err => this.toastr.error('Erro ao carregar lista de despensas'));
    this.unidadeService.listaTodos().subscribe(res => {
      this.unidades = res;
    }, err => this.toastr.error('Erro ao carregar lista de unidades'));

    this.form = this.formBuilder.group({
      produto: ['', Validators.required],
      despensa: ['', Validators.required],
      quantidade: ['', Validators.required],
      lote: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      dataValidade: ['', Validators.required]
    });
  }

  cadastrar() {
    this.loader.startBackground();

    let estoque = new Estoque();
    estoque = this.form.getRawValue();

    this.estoqueService.criar(estoque).subscribe(
      res => {
        this.router.navigate(['/home/estoque']);
        this.toastr.success('Lançamento ' + res.codigo + ' realizado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao realizar lançamento: ' + err.error.message);
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
