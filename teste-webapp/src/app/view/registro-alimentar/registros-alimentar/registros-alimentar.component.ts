import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';
import { AlunoService } from 'src/app/service/aluno.service';

import { Aluno } from '../../../model/Aluno';
import { RegistroAlimentar } from '../../../model/RegistroAlimentar';
import { RegistroAlimentarService } from '../../../service/registro-alimentar.service';

@Component({
  selector: 'app-registros-alimentar',
  templateUrl: './registros-alimentar.component.html'
})
export class RegistrosNutricionaisComponent implements OnInit {

  columns = [];
  page = new Pageable();
  resposta: Page<RegistroAlimentar>;
  registros: RegistroAlimentar[];
  codigoAluno: number;
  aluno: Aluno;

  @ViewChild('acoes') acoes: TemplateRef<any>;
  @ViewChild('dataRegistro') dataRegistro: TemplateRef<any>;

  constructor(
    private registroAlimentarService: RegistroAlimentarService,
    private alunoService: AlunoService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.loader.startBackground();
    this.codigoAluno = this.activedRoute.snapshot.params.aluno;
    this.alunoService.buscaPeloCodigo(this.codigoAluno).subscribe(res => {
      this.aluno = res;
      this.loader.stopBackground();
    }, err => {
      this.toastr.error('Erro ao carregar Aluno: ' + err.error.message);
    });

    this.setPage({ offset: 0 });
    this.columns = [
      { prop: 'codigo', name: 'Código' },
      { prop: 'receita.nome', name: 'Receita' },
      { prop: 'receita.tipoReceita', name: 'Tipo' },
      { prop: 'observacoes', name: 'Observações' },
      { prop: 'dataRegistro', cellTemplate: this.dataRegistro, name: 'Data do Registro' },
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
    this.registroAlimentarService.pesquisarPorAluno(this.codigoAluno, this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.registros = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  remover(registroAlimentar: RegistroAlimentar) {
    this.loader.startBackground();
    this.registroAlimentarService.remover(registroAlimentar.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(registroAlimentar);
        this.toastr.success
          ('Reigstro Alimentar ' + registroAlimentar.codigo + ' removido com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover registro alimentar: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.registros;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.registros = [...tmp];
  }

  novo() {
    this.router.navigate(['/home/registro-alimentar/' + this.codigoAluno + '/novo']);
  }

  editar(codigoRegistro: number) {
    this.router.navigate(['/home/registro-alimentar/' + this.codigoAluno + '/editar/' + codigoRegistro]);
  }

}
