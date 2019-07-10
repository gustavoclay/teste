import { Endereco } from './../../../model/Endereco';
import { Pessoa } from './../../../model/Pessoa';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco as EnderecoViaCep, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormValidations } from 'src/app/model/utils/FormValidations';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { Funcionario } from 'src/app/model/Funcionario';

@Component({
  selector: 'app-criar-funcionario',
  templateUrl: './criar-funcionario.component.html'
})
export class CriarFuncionarioComponent implements OnInit {

  form: FormGroup;

  @ViewChild('campoNumero') campoNumero: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService,
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      cpf: ['', [Validators.required, FormValidations.ValidaCpf]],
      dataNascimento: ['', [Validators.required]],
      formacao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      area: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      sexo: ['', [Validators.required]],
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

    const f: Funcionario = new Funcionario();
    const p: Pessoa = new Pessoa();
    const e: Endereco = new Endereco();

    f.area = this.form.get('area').value;
    f.formacao = this.form.get('formacao').value;
    p.nome = this.form.get('nome').value;
    p.cpf = this.form.get('cpf').value;
    p.dataNascimento = this.form.get('dataNascimento').value;
    p.sexo = this.form.get('sexo').value;
    p.email = this.form.get('email').value;
    p.telefone = this.form.get('telefone').value;
    p.celular = this.form.get('celular').value;
    e.cep = this.form.get('cep').value;
    e.logradouro = this.form.get('logradouro').value;
    e.numero = this.form.get('numero').value;
    e.complemento = this.form.get('complemento').value;
    e.bairro = this.form.get('bairro').value;
    e.cidade = this.form.get('cidade').value;
    e.estado = this.form.get('estado').value;

    f.pessoa = p;
    f.pessoa.endereco = e;

    this.funcionarioService.criar(f).subscribe(
      res => {
        this.router.navigate(['/home/funcionario']);
        this.toastr.success('Funcionario ' + res.codigo + ' - ' + res.pessoa.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar funcionario: ' + err.error.message);
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
}
