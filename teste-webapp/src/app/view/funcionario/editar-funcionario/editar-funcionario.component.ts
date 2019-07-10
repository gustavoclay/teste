import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco as EnderecoViaCep, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Funcionario } from 'src/app/model/Funcionario';
import { FormValidations } from 'src/app/model/utils/FormValidations';
import { FuncionarioService } from 'src/app/service/funcionario.service';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html'
})
export class EditarFuncionarioComponent implements OnInit {

  funcionario: Funcionario;
  form: FormGroup;

  @ViewChild('campoNumero') campoNumero: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      ativo: ['', [Validators.required]],
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

    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.funcionarioService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.funcionario = res;
      this.form.get('area').setValue(this.funcionario.area);
      this.form.get('formacao').setValue(this.funcionario.formacao);
      this.form.get('ativo').setValue(this.funcionario.pessoa.ativo);
      this.form.get('nome').setValue(this.funcionario.pessoa.nome);
      this.form.get('cpf').setValue(this.funcionario.pessoa.cpf);
      this.form.get('dataNascimento').setValue(this.funcionario.pessoa.dataNascimento);
      this.form.get('sexo').setValue(this.funcionario.pessoa.sexo);
      this.form.get('email').setValue(this.funcionario.pessoa.email);
      this.form.get('telefone').setValue(this.funcionario.pessoa.telefone);
      this.form.get('celular').setValue(this.funcionario.pessoa.celular);
      this.form.get('cep').setValue(this.funcionario.pessoa.endereco.cep);
      this.form.get('logradouro').setValue(this.funcionario.pessoa.endereco.logradouro);
      this.form.get('numero').setValue(this.funcionario.pessoa.endereco.numero);
      this.form.get('complemento').setValue(this.funcionario.pessoa.endereco.complemento);
      this.form.get('bairro').setValue(this.funcionario.pessoa.endereco.bairro);
      this.form.get('cidade').setValue(this.funcionario.pessoa.endereco.cidade);
      this.form.get('estado').setValue(this.funcionario.pessoa.endereco.cidade);

      this.loader.stopBackground();
    });

  }

  editar() {
    this.loader.startBackground();

    this.funcionario.area = this.form.get('area').value;
    this.funcionario.formacao = this.form.get('formacao').value;
    this.funcionario.pessoa.ativo = this.form.get('ativo').value;
    this.funcionario.pessoa.nome = this.form.get('nome').value;
    this.funcionario.pessoa.cpf = this.form.get('cpf').value;
    this.funcionario.pessoa.dataNascimento = this.form.get('dataNascimento').value;
    this.funcionario.pessoa.sexo = this.form.get('sexo').value;
    this.funcionario.pessoa.email = this.form.get('email').value;
    this.funcionario.pessoa.telefone = this.form.get('telefone').value;
    this.funcionario.pessoa.celular = this.form.get('celular').value;
    this.funcionario.pessoa.endereco.cep = this.form.get('cep').value;
    this.funcionario.pessoa.endereco.logradouro = this.form.get('logradouro').value;
    this.funcionario.pessoa.endereco.numero = this.form.get('numero').value;
    this.funcionario.pessoa.endereco.complemento = this.form.get('complemento').value;
    this.funcionario.pessoa.endereco.bairro = this.form.get('bairro').value;
    this.funcionario.pessoa.endereco.cidade = this.form.get('cidade').value;
    this.funcionario.pessoa.endereco.estado = this.form.get('estado').value;

    this.funcionarioService.atualizar(this.funcionario).subscribe(
      res => {
        this.router.navigate(['/home/funcionario']);
        this.toastr.success('Funcionario ' + res.codigo + ' - ' + res.pessoa.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar funcionario: ' + err.error.message);
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
