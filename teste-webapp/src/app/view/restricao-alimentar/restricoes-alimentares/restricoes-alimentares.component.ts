import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';

import { RestricaoAlimentar } from './../../../model/RestricaoAlimentar';
import { RestricaoAlimentarService } from './../../../service/restricao-alimentar.service';

@Component({
  selector: 'app-restricoes-alimentares',
  templateUrl: './restricoes-alimentares.component.html'
})
export class RestricoesAlimentaresComponent implements OnInit {

  columns = [];
  resposta: Page<RestricaoAlimentar>;
  restricoes: RestricaoAlimentar[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;

  constructor(
    private restricaoAlimentarService: RestricaoAlimentarService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.columns = [
      { prop: 'codigo', name: 'Código' },
      { prop: 'nome', name: 'Nome' },
      { prop: 'descricao', name: 'Descrição' },
      { prop: '', cellTemplate: this.acoes, name: 'Ações', sortable: false }
    ];
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.loader.startBackground();
    this.page.pageNumber = pageInfo.offset;
    this.restricaoAlimentarService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.restricoes = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  remover(restricaoAlimentar: RestricaoAlimentar) {
    this.loader.startBackground();
    this.restricaoAlimentarService.remover(restricaoAlimentar.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(restricaoAlimentar);
        this.toastr.success
          ('Restrição Alimentar ' + restricaoAlimentar.codigo + ' - ' + restricaoAlimentar.nome + ' removida com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover restrição alimentar: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.restricoes;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.restricoes = [...tmp];
  }

}
