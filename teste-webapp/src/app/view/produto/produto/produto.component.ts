import { Produto } from './../../../model/Produto';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';
import { ProdutoService } from '../../../service/produto.service';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html'
})
export class ProdutosComponent implements OnInit {

  columns = [];
  resposta: Page<Produto>;
  produtos: Produto[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;

  constructor(
    private produtoService: ProdutoService,
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
      { prop: 'nome', name: 'nome' },
      { prop: 'descricao', name: 'Descrição' },
      { prop: 'quantidadeMinima', name: 'Quantidade mínima' },
      { prop: 'unidade.nome', name: 'Unidade' },
      { prop: 'marca', name: 'Marca' },
      { prop: 'fornecedor.nome', name: 'Fornecedor' },
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
    this.produtoService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.produtos = res.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  removerProduto(produto: Produto) {
    this.loader.startBackground();
    this.produtoService.remover(produto.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(produto);
        this.toastr.success('produto ' + produto.codigo + ' - ' + produto.nome + ' removido com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover produto: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.produtos;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.produtos = [...tmp];
  }

}
