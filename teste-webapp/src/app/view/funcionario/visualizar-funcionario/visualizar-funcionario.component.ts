import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Funcionario } from 'src/app/model/Funcionario';
import { FuncionarioService } from 'src/app/service/funcionario.service';

@Component({
  selector: 'app-visualizar-funcionario',
  templateUrl: './visualizar-funcionario.component.html'
})
export class VisualizarFuncionarioComponent implements OnInit {

  funcionario: Funcionario;

  constructor(
    private funcionarioService: FuncionarioService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.funcionarioService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.funcionario = res;
      this.loader.stopBackground();
    });
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

  isSimNao(valor: boolean) {
    if (valor === true) { return 'Sim'; } else if (valor === false) { return 'Não'; }
  }

}
