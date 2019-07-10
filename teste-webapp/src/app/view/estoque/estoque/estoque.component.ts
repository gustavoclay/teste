import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Estoque } from 'src/app/model/Estoque';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';

import { Despensa } from './../../../model/Despensa';
import { DespensaService } from './../../../service/despensa.service';
import { EstoqueService } from './../../../service/estoque.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit {

  form: FormGroup;
  columns = [];
  despensas: Despensa[];
  despensa: Despensa;
  resposta: Page<Estoque>;
  estoques: Estoque[];
  page = new Pageable();

  constructor(
    private estoqueService: EstoqueService,
    private loader: NgxUiLoaderService,
    private despensaService: DespensaService,
    private formBuilder: FormBuilder
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      despensa: ['', Validators.required]
    });

    this.despensa = new Despensa();
    this.despensa.codigo = 1;
    this.despensaService.listaTodos().subscribe(res => {
      this.despensas = res;
      this.despensa = this.despensas[0];
      this.form.get('despensa').setValue(this.despensa);
    });

    this.setPage({ offset: 0 });
    this.columns = [
      { prop: '0.nome', name: 'Produto' },
      { prop: '0.unidade.nome', name: 'Unidade' },
      { prop: '0.marca', name: 'Marca' },
      { prop: '0.fornecedor.nome', name: 'Fornecedor' },
      { prop: '1', name: 'lote' },
      { prop: '2', name: 'Data de Validade' },
      { prop: '3', name: 'Quantidade' }
    ];
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.loader.startBackground();
    this.page.pageNumber = pageInfo.offset;
    this.estoqueService.buscaPorDespensa(this.page.pageNumber, this.page.pageSize, this.despensa.codigo).subscribe(res => {
      this.resposta = res;
      this.estoques = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  pesquisar() {
    this.despensa = this.form.get('despensa').value;
    this.setPage({ offset: 0 });
  }

  verificaValidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }

}
