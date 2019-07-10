import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Unidade } from '../../../model/Unidade';
import { UnidadeService } from '../../../service/unidade.service';

@Component({
  selector: 'app-criar-unidade',
  templateUrl: './criar-unidade.component.html'
})
export class CriarUnidadeComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unidadeService: UnidadeService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      descricao: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();

    const unidade = new Unidade();

    unidade.nome = this.form.get('nome').value;
    unidade.descricao = this.form.get('descricao').value;

    this.unidadeService.criar(unidade).subscribe(
      res => {
        this.router.navigate(['/home/unidade']);
        this.toastr.success('Unidade ' + res.codigo + ' - ' + res.nome + ' criada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar unidade: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  verificaValidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }

}
