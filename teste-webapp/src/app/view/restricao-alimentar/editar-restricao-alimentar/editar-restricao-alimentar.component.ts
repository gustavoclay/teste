import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RestricaoAlimentarService } from 'src/app/service/restricao-alimentar.service';

import { RestricaoAlimentar } from '../../../model/RestricaoAlimentar';

@Component({
  selector: 'app-editar-restricao-alimentar',
  templateUrl: './editar-restricao-alimentar.component.html'
})
export class EditarRestricaoAlimentarComponent implements OnInit {

  restricaoAlimentar: RestricaoAlimentar;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private restricaoAlimentarService: RestricaoAlimentarService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.restricaoAlimentarService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.restricaoAlimentar = res;
      this.form.get('nome').setValue(this.restricaoAlimentar.nome);
      this.form.get('descricao').setValue(this.restricaoAlimentar.descricao);
      this.loader.stopBackground();
    });
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: ['']
    });

  }

  editar() {
    this.loader.startBackground();
    this.restricaoAlimentar.nome = this.form.get('nome').value;
    this.restricaoAlimentar.descricao = this.form.get('descricao').value;
    this.restricaoAlimentarService.atualizar(this.restricaoAlimentar).subscribe(
      res => {
        this.router.navigate(['/home/restricao-alimentar']);
        this.toastr.success('Restrição Alimentar ' + res.codigo + ' - ' + res.nome + ' editada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar restrição alimentar: ' + err.error.message);
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
