import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';

import { Receita } from '../../../model/Receita';
import { ReceitaService } from '../../../service/receita.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html'
})
export class ReceitasComponent implements OnInit {

  columns = [];
  resposta: Page<Receita>;
  receitas: Receita[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;

  constructor(
    private receitaService: ReceitaService,
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
      { prop: 'tipoReceita', name: 'Tipo' },
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
    this.receitaService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.receitas = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  remover(receita: Receita) {
    this.loader.startBackground();
    this.receitaService.remover(receita.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(receita);
        this.toastr.success
          ('Receita ' + receita.codigo + ' - ' + receita.nome + ' removida com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover receita: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.receitas;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.receitas = [...tmp];
  }

}
