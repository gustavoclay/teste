import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Pessoa } from 'src/app/model/Pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-visualizar-pessoa',
  templateUrl: './visualizar-pessoa.component.html'
})
export class VisualizarPessoaComponent implements OnInit {

  pessoa: Pessoa;

  constructor(
    private pessoaService: PessoaService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.codigo;
    this.pessoaService.findById(id).subscribe(res => {
      this.loader.startBackground();
      this.pessoa = res;
      this.loader.stopBackground();
    });
  }

}
