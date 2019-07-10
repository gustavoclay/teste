import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { Receita } from 'src/app/model/Receita';
import { RegistroAlimentar } from 'src/app/model/RegistroAlimentar';
import { AlunoService } from 'src/app/service/aluno.service';
import { ReceitaService } from 'src/app/service/receita.service';
import { RegistroAlimentarService } from 'src/app/service/registro-alimentar.service';

@Component({
  selector: 'app-editar-registro-alimentar',
  templateUrl: './editar-registro-alimentar.component.html'
})
export class EditarRegistroAlimentarComponent implements OnInit {

  registroAlimentar: RegistroAlimentar;
  form: FormGroup;
  codigoAluno: number;
  aluno: Aluno;
  codigo: number;
  receitas: Receita[];

  constructor(
    private formBuilder: FormBuilder,
    private registroAlimentarService: RegistroAlimentarService,
    private alunoService: AlunoService,
    private receitaServie: ReceitaService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {

    this.receitaServie.listaTodos().subscribe(res => {
      this.receitas = res;
    });

    this.form = this.formBuilder.group({
      receita: ['', [Validators.required]],
      observacoes: ['', [Validators.minLength(3), Validators.maxLength(255)]]
    });

    this.loader.startBackground();
    this.codigoAluno = this.activatedRoute.snapshot.params.aluno;
    this.codigo = this.activatedRoute.snapshot.params.codigo;

    this.registroAlimentarService.buscaPorCodigo(this.codigo).subscribe(res => {
      this.registroAlimentar = res;
      this.form.get('receita').setValue(this.registroAlimentar.receita);
      this.form.get('observacoes').setValue(this.registroAlimentar.observacoes);

      this.alunoService.buscaPeloCodigo(this.codigoAluno).subscribe(resp => {
        this.aluno = resp;
      }, err => {
        this.toastr.error('Erro ao carregar Registro Alimentar: ' + err.error.message);
        this.loader.stopBackground();
      });
      this.loader.stopBackground();
    });

  }

  editar() {
    this.loader.startBackground();
    this.registroAlimentar.receita = this.form.get('receita').value;
    this.registroAlimentar.observacoes = this.form.get('observacoes').value;
    this.registroAlimentarService.atualizar(this.registroAlimentar).subscribe(
      res => {
        this.router.navigate(['/home/registro-alimentar/' + this.codigoAluno]);
        this.toastr.success('Registro Alimentar ' + res.codigo + ' editada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar registro alimentar: ' + err.error.message);
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
