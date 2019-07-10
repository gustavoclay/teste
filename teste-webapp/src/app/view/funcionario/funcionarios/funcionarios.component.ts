import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Funcionario } from 'src/app/model/Funcionario';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';
import { FuncionarioService } from 'src/app/service/funcionario.service';



@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html'
})
export class FuncionariosComponent implements OnInit {

  columns = [];
  resposta: Page<Funcionario>;
  funcionarios: Funcionario[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;
  @ViewChild('ativo') ativo: TemplateRef<any>;

  constructor(
    private funcionarioService: FuncionarioService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.columns = [
      { prop: 'codigo', name: 'Matrícula' },
      { prop: 'pessoa.nome', name: 'Nome' },
      { prop: 'area', name: 'Área' },
      { prop: 'pessoa.ativo', cellTemplate: this.ativo, name: 'Status' },
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
    this.funcionarioService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.funcionarios = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  removerFuncionario(funcionario: Funcionario) {
    this.loader.startBackground();
    this.funcionarioService.remover(funcionario.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(funcionario);
        this.toastr.success('Funcionario ' + funcionario.codigo + ' - ' + funcionario.pessoa.nome + ' removido com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover funcionario: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.funcionarios;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.funcionarios = [...tmp];
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

}
