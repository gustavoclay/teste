import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Despensa } from '../../../model/Despensa';
import { DespensaService } from '../../../service/despensa.service';


@Component({
  selector: 'app-editar-despensa',
  templateUrl: './editar-despensa.component.html'
})
export class EditarDespensaComponent implements OnInit {

  despensa: Despensa;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private despensaService: DespensaService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.despensaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.despensa = res;
      this.form.get('nome').setValue(this.despensa.nome);
      this.form.get('descricao').setValue(this.despensa.descricao);
      this.loader.stopBackground();
    });
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: ['']
    });

  }

  editar() {
    this.loader.startBackground();
    this.despensa.nome = this.form.get('nome').value;
    this.despensa.descricao = this.form.get('descricao').value;
    this.despensaService.atualizar(this.despensa).subscribe(
      res => {
        this.router.navigate(['/home/despensa']);
        this.toastr.success('Despensa ' + res.codigo + ' - ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar despensa: ' + err.error.message);
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
