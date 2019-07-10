import { FornecedorService } from './../../../service/fornecedor.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';


@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedor.component.html'
})
export class FornecedoresComponent implements OnInit {

  columns = [];
  resposta: Page<Fornecedor>;
  fornecedores: Fornecedor[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;

  constructor(
    private fornecedorService: FornecedorService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.columns = [
      { prop: 'codigo', name: 'Código' },
      { prop: 'nome', name: 'Nome' },
      { prop: 'cpfCnpj', name: 'CPF/CNPJ' },
      { prop: 'responsavel', name: 'Responsável' },
      { prop: '', cellTemplate: this.acoes, name: 'Ações', sortable: false}
    ];
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.loader.startBackground();
    this.page.pageNumber = pageInfo.offset;
    this.fornecedorService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.fornecedores = res.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  removerFornecedor(fornecedor: Fornecedor) {
    this.loader.startBackground();
    this.fornecedorService.remover(fornecedor.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(fornecedor);
        this.toastr.success('Fornecedor ' + fornecedor.codigo + ' - ' + fornecedor.nome + ' removido com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover fornecedor: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.fornecedores;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.fornecedores = [...tmp];
  }

}
