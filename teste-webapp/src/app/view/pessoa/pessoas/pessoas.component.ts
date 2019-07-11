import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Pessoa } from 'src/app/model/Pessoa';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html'
})
export class PessoasComponent implements OnInit {

  columns = [];
  resposta: Page<Pessoa>;
  pessoas: Pessoa[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;
  @ViewChild('ativo') ativo: TemplateRef<any>;

  constructor(
    private pessoaService: PessoaService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.columns = [
      { prop: 'id', name: 'Id' },
      { prop: 'nome', name: 'Nome' },
      { prop: 'dataNascimento', name: 'Data de Nascimento' },
      { prop: '', cellTemplate: this.acoes, name: 'Ações', sortable: false }
    ];
  }

  setPage(pageInfo) {
    this.loader.startBackground();
    this.page.pageNumber = pageInfo.offset;
    this.pessoaService.findAll(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.pessoas = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  removerPessoa(pessoa: Pessoa) {
    this.loader.startBackground();
    this.pessoaService.remover(pessoa.id).subscribe(
      res => {
        this.removerRegistroDaLista(pessoa);
        this.toastr.success('Pessoa ' + pessoa.id + ' - ' + pessoa.nome + ' removida com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover pessoa: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.pessoas;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.pessoas = [...tmp];
  }


}
