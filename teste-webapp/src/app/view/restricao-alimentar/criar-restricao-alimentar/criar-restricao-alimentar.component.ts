import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { RestricaoAlimentar } from './../../../model/RestricaoAlimentar';
import { RestricaoAlimentarService } from './../../../service/restricao-alimentar.service';

@Component({
  selector: 'app-criar-restricao-alimentar',
  templateUrl: './criar-restricao-alimentar.component.html'
})
export class CriarRestricaoAlimentarComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private restricaoAlimentarService: RestricaoAlimentarService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();

    const restricaoAlimentar = new RestricaoAlimentar();

    restricaoAlimentar.nome = this.form.get('nome').value;
    restricaoAlimentar.descricao = this.form.get('descricao').value;


    this.restricaoAlimentarService.criar(restricaoAlimentar).subscribe(
      res => {
        this.router.navigate(['/home/restricao-alimentar']);
        this.toastr.success('Restrição Alimentar ' + res.codigo + ' - ' + res.nome + ' criada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar restrição alimentar: ' + err.error.message);
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
