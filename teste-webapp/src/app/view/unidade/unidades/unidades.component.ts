import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';

import { Unidade } from '../../../model/Unidade';
import { UnidadeService } from '../../../service/unidade.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html'
})
export class UnidadesComponent implements OnInit {

  columns = [];
  resposta: Page<Unidade>;
  unidades: Unidade[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;

  constructor(
    private unidadeService: UnidadeService,
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
    this.unidadeService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.unidades = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  remover(unidade: Unidade) {
    this.loader.startBackground();
    this.unidadeService.remover(unidade.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(unidade);
        this.toastr.success
          ('Unidade ' + unidade.codigo + ' - ' + unidade.nome + ' removida com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover unidade: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.unidades;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.unidades = [...tmp];
  }

}
