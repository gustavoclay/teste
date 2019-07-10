import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';

import { Despensa } from '../../../model/Despensa';
import { DespensaService } from '../../../service/despensa.service';


@Component({
  selector: 'app-despensa',
  templateUrl: './despensa.component.html'
})
export class DespensaComponent implements OnInit {

  columns = [];
  resposta: Page<Despensa>;
  despensa: Despensa[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;
  @ViewChild('ativo') ativo: TemplateRef<any>;

  constructor(
    private despensaService: DespensaService,
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
    this.despensaService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.despensa = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  remover(despensa: Despensa) {
    this.loader.startBackground();
    this.despensaService.remover(despensa.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(despensa);
        this.toastr.success
          ('Despensa ' + despensa.codigo + ' - ' + despensa.nome + ' removida com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover despensa: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.despensa;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.despensa = [...tmp];
  }

}
