import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';
import { AlunoService } from 'src/app/service/aluno.service';



@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html'
})
export class AlunosComponent implements OnInit {

  columns = [];
  resposta: Page<Aluno>;
  alunos: Aluno[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;
  @ViewChild('nutricao') nutricao: TemplateRef<any>;
  @ViewChild('ativo') ativo: TemplateRef<any>;
  @ViewChild('dataNascimento') dataNascimento: TemplateRef<any>;

  constructor(
    private alunoService: AlunoService,
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
      { prop: 'pessoa.cpf', name: 'CPF' },
      { prop: 'pessoa.dataNascimento', cellTemplate: this.dataNascimento, name: 'Data de Nascimento' },
      { prop: 'pessoa.ativo', cellTemplate: this.ativo, name: 'Status' },
      { prop: '', cellTemplate: this.nutricao, name: 'Nutrição', sortable: false },
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
    this.alunoService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.alunos = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  removerAluno(aluno: Aluno) {
    this.loader.startBackground();
    this.alunoService.remover(aluno.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(aluno);
        this.toastr.success('Aluno ' + aluno.codigo + ' - ' + aluno.pessoa.nome + ' removido com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover aluno: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.alunos;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.alunos = [...tmp];
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

}
