import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco as EnderecoViaCep, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { notVoidOrNull } from 'src/app/core/utils/notVoidOrNull';
import { Aluno } from 'src/app/model/Aluno';
import { Pessoa } from 'src/app/model/Pessoa';
import { AlunoService } from 'src/app/service/aluno.service';

import { Endereco } from '../../../model/Endereco';
import { FichaSaude } from '../../../model/FichaSaude';
import { FormValidations } from './../../../model/utils/FormValidations';

@Component({
  selector: 'app-criar-aluno',
  templateUrl: './criar-aluno.component.html'
})
export class CriarAlunoComponent implements OnInit {

  form: FormGroup;

  @ViewChild('campoNumero') campoNumero: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
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
      sexo: ['', [Validators.required]],
      pai: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      mae: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      celular: [''],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required, Validators.maxLength(120)]],
      numero: ['', [Validators.required]],
      complemento: ['', [Validators.maxLength(120)]],
      bairro: ['', [Validators.required, Validators.maxLength(120)]],
      cidade: ['', [Validators.required, Validators.maxLength(120)]],
      estado: ['', [Validators.required, Validators.maxLength(120)]],
      cartaoSus: ['', [Validators.maxLength(120)]],
      doenca: [''],
      tipoSanguineo: [''],
      doencaDescricao: [''],
      medicamento: [''],
      medicamentoDescricao: [''],
      suplemento: [''],
      suplementoDescricao: [''],
      deficiencia: [''],
      deficienciaDescricao: [''],
      alergia: [''],
      alergiaDescricao: [''],
      intolerancia: [''],
      intoleranciaDescricao: ['']
    });
  }

  cadastrar() {

    this.loader.startBackground();

    const pessoa = new Pessoa();
    const aluno = new Aluno();
    const endereco = new Endereco();
    const fichaSaude = new FichaSaude();

    pessoa.nome = this.form.get('nome').value;
    pessoa.cpf = this.form.get('cpf').value;
    pessoa.dataNascimento = this.form.get('dataNascimento').value;
    pessoa.sexo = notVoidOrNull(this.form.get('sexo').value) ? this.form.get('sexo').value : null;
    pessoa.pai = this.form.get('pai').value;
    pessoa.mae = this.form.get('mae').value;
    pessoa.email = this.form.get('email').value;
    pessoa.telefone = this.form.get('telefone').value;
    pessoa.celular = this.form.get('celular').value;
    endereco.cep = this.form.get('cep').value;
    endereco.logradouro = this.form.get('logradouro').value;
    endereco.numero = this.form.get('numero').value;
    endereco.complemento = this.form.get('complemento').value;
    endereco.bairro = this.form.get('bairro').value;
    endereco.cidade = this.form.get('cidade').value;
    endereco.estado = this.form.get('estado').value;
    fichaSaude.cartaoSus = this.form.get('cartaoSus').value;
    fichaSaude.tipoSanguineo = notVoidOrNull(this.form.get('tipoSanguineo').value) ? this.form.get('tipoSanguineo').value : null;
    fichaSaude.doenca = this.form.get('doenca').value;
    fichaSaude.doencaDescricao = this.form.get('doencaDescricao').value;
    fichaSaude.medicamento = this.form.get('medicamento').value;
    fichaSaude.medicamentoDescricao = this.form.get('medicamentoDescricao').value;
    fichaSaude.suplemento = this.form.get('suplemento').value;
    fichaSaude.suplementoDescricao = this.form.get('suplementoDescricao').value;
    fichaSaude.deficiencia = this.form.get('deficiencia').value;
    fichaSaude.deficienciaDescricao = this.form.get('deficienciaDescricao').value;
    fichaSaude.alergia = this.form.get('alergia').value;
    fichaSaude.alergiaDescricao = this.form.get('alergiaDescricao').value;
    fichaSaude.intolerancia = this.form.get('intolerancia').value;
    fichaSaude.intoleranciaDescricao = this.form.get('intoleranciaDescricao').value;

    pessoa.endereco = endereco;
    aluno.pessoa = pessoa;
    aluno.fichaSaude = fichaSaude;

    this.alunoService.criar(aluno).subscribe(
      res => {
        this.router.navigate(['/home/aluno']);
        this.toastr.success('Aluno ' + res.codigo + ' - ' + res.pessoa.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar aluno: ' + err.error.message);
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
