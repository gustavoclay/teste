import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Curso } from 'src/app/model/Curso';
import { Turma } from 'src/app/model/Turma';
import { CursoService } from 'src/app/service/curso.service';
import { TurmaService } from 'src/app/service/turma.service';


@Component({
  selector: 'app-editar-turma',
  templateUrl: './editar-turma.component.html'
})
export class EditarTurmaComponent implements OnInit {

  turma: Turma;
  cursos: Curso[];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private cursoService: CursoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.loader.startBackground();
    this.cursoService.listaTodos().subscribe(res => {
      this.cursos = res;
    }, err => {
      this.toastr.error('Erro ao carregar cursos: ' + err.error.message);
    });

    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.turmaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.turma = res;
      this.form.get('nome').setValue(this.turma.nome);
      this.form.get('ativo').setValue(this.turma.ativo);
      this.form.get('sala').setValue(this.turma.sala);
      this.form.get('curso').setValue(this.turma.curso);
      this.form.get('periodo').setValue(this.turma.periodo);
      this.form.get('dataInicio').setValue(this.turma.dataInicio);
      this.form.get('dataFim').setValue(this.turma.dataFim);
      this.loader.stopBackground();
    });
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      sala: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      curso: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
      dataInicio: [''],
      dataFim: [''],
      ativo: ['']
    });

  }

  editar() {
    this.loader.startBackground();

    const curso = new Curso();

    curso.codigo = this.form.get('curso').value;

    this.turma.nome = this.form.get('nome').value;
    this.turma.sala = this.form.get('sala').value;
    this.turma.periodo = this.form.get('periodo').value;
    this.turma.dataInicio = this.form.get('dataInicio').value;
    this.turma.dataFim = this.form.get('dataFim').value;
    this.turma.ativo = this.form.get('ativo').value;
    this.turma.curso = curso;

    this.turmaService.atualizar(this.turma).subscribe(
      res => {
        this.router.navigate(['/home/turma']);
        this.toastr.success('Turma ' + res.codigo + ' - ' + res.nome + ' editada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar turma: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

  verificaValidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }

}
