import { ReceitaService } from './../../../service/receita.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { RegistroAlimentarService } from '../../../service/registro-alimentar.service';
import { Aluno } from '../../../model/Aluno';
import { RegistroAlimentar } from '../../../model/RegistroAlimentar';
import { AlunoService } from '../../../service/aluno.service';
import { Receita } from 'src/app/model/Receita';


@Component({
  selector: 'app-criar-registro-alimentar',
  templateUrl: './criar-registro-alimentar.component.html'
})
export class CriarRegistroAlimentarComponent implements OnInit {

  form: FormGroup;
  codigoAluno: number;
  aluno: Aluno;
  receitas: Receita[];

  constructor(
    private formBuilder: FormBuilder,
    private registroAlimentarService: RegistroAlimentarService,
    private alunoService: AlunoService,
    private receitaServie: ReceitaService,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.loader.startBackground();
    this.codigoAluno = this.activedRoute.snapshot.params.aluno;
    this.alunoService.buscaPeloCodigo(this.codigoAluno).subscribe(res => {
      this.aluno = res;
      this.loader.stopBackground();
    }, err => {
      this.toastr.error('Erro ao carregar Aluno: ' + err.error.message);
    });

    this.receitaServie.listaTodos().subscribe(res => {
      this.receitas = res;
    });

    this.form = this.formBuilder.group({
      receita: ['', [Validators.required]],
      observacoes: ['', [Validators.minLength(3), Validators.maxLength(255)]]
    });
  }

  cadastrar() {
    this.loader.startBackground();

    const registro = new RegistroAlimentar();
    const aluno = new Aluno();

    aluno.codigo = this.codigoAluno;
    registro.aluno = aluno;
    registro.receita = this.form.get('receita').value;
    registro.observacoes = this.form.get('observacoes').value;

    this.registroAlimentarService.criar(registro).subscribe(
      res => {
        this.router.navigate(['/home/registro-alimentar/' + this.codigoAluno]);
        this.toastr.success('Registro Alimentar ' + res.codigo + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar registro alimentar: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  cancelar() {
    this.router.navigate(['/home/registro-alimentar/' + this.codigoAluno]);
  }

  verificaValidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }
}
