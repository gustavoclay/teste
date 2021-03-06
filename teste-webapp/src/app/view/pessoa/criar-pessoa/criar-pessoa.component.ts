import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Pessoa } from 'src/app/model/Pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';

import { EstadosLista } from './../../../model/enums/Estados';


@Component({
  selector: 'app-criar-pessoa',
  templateUrl: './criar-pessoa.component.html'
})
export class CriarPessoaComponent implements OnInit {

  form: FormGroup;
  estados = EstadosLista;
  documentos: {
    id: number;
    tipo: string;
    numero: string;
  }[];

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      documentos: this.formBuilder.array([])
    });

    this.documentos = [];
  }

  cadastrar() {
    this.loader.startBackground();

    const pessoa: Pessoa = new Pessoa();

    pessoa.nome = this.form.get('nome').value;
    pessoa.email = this.form.get('email').value;
    pessoa.dataNascimento = this.form.get('dataNascimento').value;
    pessoa.estado = this.form.get('estado').value;

    this.pessoaService.save(pessoa).subscribe(
      res => {
        this.router.navigate(['/home/pessoas']);
        this.toastr.success('Pessoa ' + res.id + ' - ' + res.pessoa.nome + ' criada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar pessoa: ' + err.error.message);
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

  get formArray() {
    return this.form.get('documentos') as FormArray;
  }

  addItem(item) {
    this.documentos.push(item);
    this.formArray.push(this.formBuilder.control(false));
  }
  removeItem() {
    this.documentos.pop();
    this.formArray.removeAt(this.formArray.length - 1);
  }

}
