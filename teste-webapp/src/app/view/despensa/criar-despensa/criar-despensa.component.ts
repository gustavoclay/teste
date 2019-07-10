import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Despensa } from '../../../model/Despensa';
import { DespensaService } from '../../../service/despensa.service';

@Component({
  selector: 'app-criar-despensa',
  templateUrl: './criar-despensa.component.html'
})
export class CriarDespensaComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private despensaService: DespensaService,
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

    const despensa = new Despensa();

    despensa.nome = this.form.get('nome').value;
    despensa.descricao = this.form.get('descricao').value;


    this.despensaService.criar(despensa).subscribe(
      res => {
        this.router.navigate(['/home/despensa']);
        this.toastr.success('Despensa ' + res.codigo + ' - ' + res.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar despensa: ' + err.error.message);
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
