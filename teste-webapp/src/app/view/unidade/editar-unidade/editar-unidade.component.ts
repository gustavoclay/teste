import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UnidadeService } from 'src/app/service/unidade.service';

import { Unidade } from '../../../model/Unidade';

@Component({
  selector: 'app-editar-unidade',
  templateUrl: './editar-unidade.component.html'
})
export class EditarUnidadeComponent implements OnInit {

  unidade: Unidade;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unidadeService: UnidadeService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.unidadeService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.unidade = res;
      this.form.get('nome').setValue(this.unidade.nome);
      this.form.get('descricao').setValue(this.unidade.descricao);
      this.loader.stopBackground();
    });
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      descricao: ['']
    });

  }

  editar() {
    this.loader.startBackground();
    this.unidade.nome = this.form.get('nome').value;
    this.unidade.descricao = this.form.get('descricao').value;
    this.unidadeService.atualizar(this.unidade).subscribe(
      res => {
        this.router.navigate(['/home/unidade']);
        this.toastr.success('Unidade ' + res.codigo + ' - ' + res.nome + ' editada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar unidade: ' + err.error.message);
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
