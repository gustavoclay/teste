import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco as EnderecoViaCep, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormValidations } from 'src/app/model/utils/FormValidations';

import { Fornecedor } from './../../../model/Fornecedor';
import { FornecedorService } from './../../../service/fornecedor.service';

@Component({
  selector: 'app-editar-fornecedor',
  templateUrl: './editar-fornecedor.component.html'
})
export class EditarFornecedorComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.fornecedorService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.fornecedor = res;
      this.form.get('nome').setValue(this.fornecedor.nome);
      this.form.get('cpfCnpj').setValue(this.fornecedor.cpfCnpj);
      this.form.get('email').setValue(this.fornecedor.email);
      this.form.get('responsavel').setValue(this.fornecedor.responsavel);
      this.form.get('telefone').setValue(this.fornecedor.telefone);
      this.form.get('cep').setValue(this.fornecedor.endereco.cep);
      this.form.get('logradouro').setValue(this.fornecedor.endereco.logradouro);
      this.form.get('numero').setValue(this.fornecedor.endereco.numero);
      this.form.get('complemento').setValue(this.fornecedor.endereco.complemento);
      this.form.get('bairro').setValue(this.fornecedor.endereco.bairro);
      this.form.get('cidade').setValue(this.fornecedor.endereco.cidade);
      this.form.get('estado').setValue(this.fornecedor.endereco.cidade);

      this.loader.stopBackground();
    });
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

  editar() {
    this.loader.startBackground();

    this.fornecedor.nome = this.form.get('nome').value;
    this.fornecedor.cpfCnpj = this.form.get('cpfCnpj').value;
    this.fornecedor.email = this.form.get('email').value;
    this.fornecedor.telefone = this.form.get('telefone').value;
    this.fornecedor.responsavel = this.form.get('responsavel').value;
    this.fornecedor.endereco.cep = this.form.get('cep').value;
    this.fornecedor.endereco.logradouro = this.form.get('logradouro').value;
    this.fornecedor.endereco.numero = this.form.get('numero').value;
    this.fornecedor.endereco.complemento = this.form.get('complemento').value;
    this.fornecedor.endereco.bairro = this.form.get('bairro').value;
    this.fornecedor.endereco.cidade = this.form.get('cidade').value;
    this.fornecedor.endereco.estado = this.form.get('estado').value;

    this.fornecedorService.atualizar(this.fornecedor).subscribe(
      res => {
        this.router.navigate(['/home/fornecedor']);
        this.toastr.success('Fornecedor ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar Fornecedor: ' + err.error.message);
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
