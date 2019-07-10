import { FormValidations } from './../../../model/utils/FormValidations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco as EnderecoViaCep, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Endereco } from '../../../model/Endereco';
import { FornecedorService } from '../../../service/fornecedor.service';
import { Fornecedor } from './../../../model/Fornecedor';

@Component({
  selector: 'app-criar-fornecedor',
  templateUrl: './criar-fornecedor.component.html'
})
export class CriarFornecedorComponent implements OnInit {

  fornecedor: Fornecedor;
  form: FormGroup;
  campoCnpj = true;
  maskCnpj = '00.000.000/0000-00';
  maskCpf = '000.000.000-00';

  @ViewChild('campoNumero') campoNumero: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService,
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      cpfCnpj: ['', [Validators.required, FormValidations.ValidaCnpj]],
      responsavel: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      celular: [''],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required, Validators.maxLength(120)]],
      numero: ['', [Validators.required]],
      complemento: ['', [Validators.maxLength(120)]],
      bairro: ['', [Validators.required, Validators.maxLength(120)]],
      cidade: ['', [Validators.required, Validators.maxLength(120)]],
      estado: ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  cadastrar() {
    this.loader.startBackground();
    const fornecedor = new Fornecedor();
    const e = new Endereco();
    fornecedor.nome = this.form.get('nome').value;
    fornecedor.cpfCnpj = this.form.get('cpfCnpj').value;
    fornecedor.email = this.form.get('email').value;
    fornecedor.responsavel = this.form.get('responsavel').value;
    fornecedor.telefone = this.form.get('telefone').value;
    fornecedor.celular = this.form.get('celular').value;
    e.cep = this.form.get('cep').value;
    e.logradouro = this.form.get('logradouro').value;
    e.numero = this.form.get('numero').value;
    e.complemento = this.form.get('complemento').value;
    e.bairro = this.form.get('bairro').value;
    e.cidade = this.form.get('cidade').value;
    e.estado = this.form.get('estado').value;

    fornecedor.endereco = e;

    this.fornecedorService.criar(fornecedor).subscribe(
      res => {
        this.router.navigate(['/home/fornecedor']);
        this.toastr.success('Fornecedor ' + res.codigo + ' - ' + res.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar fornecedor: ' + err.error.message)
        this.loader.stopBackground();
      }
    );
  }

  buscaCep() {
    this.loader.startBackground();
    this.viacep.buscarPorCep(this.form.get('cep').value).then((endereco: EnderecoViaCep) => {
      this.form.get('cep').setValue(endereco.cep);
      this.form.get('logradouro').setValue(endereco.logradouro);
      this.form.get('complemento').setValue(endereco.complemento);
      this.form.get('bairro').setValue(endereco.bairro);
      this.form.get('cidade').setValue(endereco.localidade);
      this.form.get('estado').setValue(endereco.uf);
      this.campoNumero.nativeElement.focus();
      this.loader.stopBackground();
    }).catch((error: ErroCep) => {
      this.toastr.info(error.message);
      this.loader.stopBackground();
    });
  }

  verificaValidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }

  fieldCnpj() {
    this.form.get('cpfCnpj').setValidators([Validators.required, FormValidations.ValidaCnpj]);
    this.campoCnpj = true;
  }

  fieldCpf() {
    this.form.get('cpfCnpj').setValidators([Validators.required, FormValidations.ValidaCpf]);
    this.campoCnpj = false;
  }

}
