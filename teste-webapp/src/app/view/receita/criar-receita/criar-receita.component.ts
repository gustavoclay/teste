import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Receita } from '../../../model/Receita';
import { ReceitaService } from '../../../service/receita.service';

@Component({
  selector: 'app-criar-receita',
  templateUrl: './criar-receita.component.html'
})
export class CriarReceitaComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private receitaService: ReceitaService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      ingredientes: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
      modoPreparo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
      tipoReceita: ['', [Validators.required]]
    });
  }

  cadastrar() {
    this.loader.startBackground();

    let receita = new Receita();
    receita = this.form.getRawValue();

    this.receitaService.criar(receita).subscribe(
      res => {
        this.router.navigate(['/home/receita']);
        this.toastr.success('Receita ' + res.codigo + ' - ' + res.nome + ' criada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar receita: ' + err.error.message);
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
