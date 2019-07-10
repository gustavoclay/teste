import { FornecedorService } from './../../../service/fornecedor.service';
import { Fornecedor } from './../../../model/Fornecedor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-visualizar-fornecedor',
  templateUrl: './visualizar-fornecedor.component.html'
})
export class VisualizarFornecedorComponent implements OnInit {

  fornecedor: Fornecedor;

  constructor(
    private fornecedorService: FornecedorService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.fornecedorService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.fornecedor = res;
      this.loader.stopBackground();
    });
  }

}
