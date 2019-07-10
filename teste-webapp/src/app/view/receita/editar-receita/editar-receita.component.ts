import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReceitaService } from 'src/app/service/receita.service';

import { Receita } from '../../../model/Receita';

@Component({
  selector: 'app-editar-receita',
  templateUrl: './editar-receita.component.html'
})
export class EditarReceitaComponent implements OnInit {

  receita: Receita;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private receitaService: ReceitaService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      ingredientes: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
      modoPreparo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
      tipoReceita: ['', [Validators.required]]
    });

    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.receitaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.receita = res;
      this.form.patchValue(this.receita);
      this.loader.stopBackground();
    });

  }

  editar() {
    this.loader.startBackground();
    this.receita.nome = this.form.get('nome').value;
    this.receita.descricao = this.form.get('descricao').value;
    this.receita.ingredientes = this.form.get('ingredientes').value;
    this.receita.modoPreparo = this.form.get('modoPreparo').value;
    this.receita.tipoReceita = this.form.get('tipoReceita').value;
    this.receitaService.atualizar(this.receita).subscribe(
      res => {
        this.router.navigate(['/home/receita']);
        this.toastr.success('Receita ' + res.codigo + ' - ' + res.nome + ' editada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar receita: ' + err.error.message);
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
