import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { RegistroNutricional } from 'src/app/model/RegistroNutricional';
import { AlunoService } from 'src/app/service/aluno.service';
import { RegistroNutricionalService } from 'src/app/service/registro-nutricional.service';

@Component({
  selector: 'app-editar-registro-nutricional',
  templateUrl: './editar-registro-nutricional.component.html'
})
export class EditarRegistroNutricionalComponent implements OnInit {

  registroNutricional: RegistroNutricional;
  form: FormGroup;
  codigoAluno: number;
  aluno: Aluno;
  codigo: number;

  constructor(
    private formBuilder: FormBuilder,
    private registroNutricionalService: RegistroNutricionalService,
    private alunoService: AlunoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.loader.startBackground();
    this.codigoAluno = this.activatedRoute.snapshot.params.aluno;
    this.codigo = this.activatedRoute.snapshot.params.codigo;

    this.registroNutricionalService.buscaPorCodigo(this.codigo).subscribe(res => {
      this.registroNutricional = res;
      this.form.get('altura').setValue(this.registroNutricional.altura);
      this.form.get('peso').setValue(this.registroNutricional.peso);

      this.alunoService.buscaPeloCodigo(this.codigoAluno).subscribe(resp => {
        this.aluno = resp;
      }, err => {
        this.toastr.error('Erro ao carregar Registro Nutricional: ' + err.error.message);
        this.loader.stopBackground();
      });
      this.loader.stopBackground();
    });

    this.form = this.formBuilder.group({
      altura: [''], peso: ['']
    });

  }

  editar() {
    this.loader.startBackground();
    this.registroNutricional.altura = this.form.get('altura').value;
    this.registroNutricional.peso = this.form.get('peso').value;
    this.registroNutricionalService.atualizar(this.registroNutricional).subscribe(
      res => {
        this.router.navigate(['/home/registro-nutricional/' + this.codigoAluno]);
        this.toastr.success('Registro Nutricional ' + res.codigo + ' editada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar registro nutricional: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  cancelar() {
    this.router.navigate(['/home/registro-nutricional/' + this.codigoAluno]);
  }

}
