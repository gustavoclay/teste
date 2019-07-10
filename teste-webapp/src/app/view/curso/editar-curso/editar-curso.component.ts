import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Curso } from 'src/app/model/Curso';
import { CursoService } from 'src/app/service/curso.service';


@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html'
})
export class EditarCursoComponent implements OnInit {

  curso: Curso;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.cursoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.curso = res;
      this.form.get('nome').setValue(this.curso.nome);
      this.form.get('descricao').setValue(this.curso.descricao);
      this.form.get('ativo').setValue(this.curso.ativo);
      this.loader.stopBackground();
    });
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: [''],
      ativo: ['']
    });

  }

  editar() {
    this.loader.startBackground();
    this.curso.nome = this.form.get('nome').value;
    this.curso.descricao = this.form.get('descricao').value;
    this.curso.ativo = this.form.get('ativo').value;
    this.cursoService.atualizar(this.curso).subscribe(
      res => {
        this.router.navigate(['/home/curso']);
        this.toastr.success('Curso ' + res.codigo + ' - ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar curso: ' + err.error.message);
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
