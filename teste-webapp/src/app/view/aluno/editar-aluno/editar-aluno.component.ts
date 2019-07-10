import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco as EnderecoViaCep, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { notVoidOrNull } from 'src/app/core/utils/notVoidOrNull';
import { Aluno } from 'src/app/model/Aluno';
import { FormValidations } from 'src/app/model/utils/FormValidations';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html'
})
export class EditarAlunoComponent implements OnInit {

  aluno: Aluno;
  form: FormGroup;
  modalRef: BsModalRef;

  @ViewChild('campoNumero') campoNumero: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      ativo: [''],
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

    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.alunoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.aluno = res;
      this.form.get('nome').setValue(this.aluno.pessoa.nome);
      this.form.get('cpf').setValue(this.aluno.pessoa.cpf);
      this.form.get('dataNascimento').setValue(this.aluno.pessoa.dataNascimento);
      this.form.get('sexo').setValue(this.aluno.pessoa.sexo);
      this.form.get('pai').setValue(this.aluno.pessoa.pai);
      this.form.get('mae').setValue(this.aluno.pessoa.mae);
      this.form.get('email').setValue(this.aluno.pessoa.email);
      this.form.get('telefone').setValue(this.aluno.pessoa.telefone);
      this.form.get('celular').setValue(this.aluno.pessoa.celular);
      this.form.get('cep').setValue(this.aluno.pessoa.endereco.cep);
      this.form.get('logradouro').setValue(this.aluno.pessoa.endereco.logradouro);
      this.form.get('numero').setValue(this.aluno.pessoa.endereco.numero);
      this.form.get('complemento').setValue(this.aluno.pessoa.endereco.complemento);
      this.form.get('bairro').setValue(this.aluno.pessoa.endereco.bairro);
      this.form.get('cidade').setValue(this.aluno.pessoa.endereco.cidade);
      this.form.get('estado').setValue(this.aluno.pessoa.endereco.cidade);
      this.form.get('cartaoSus').setValue(this.aluno.fichaSaude.cartaoSus);
      this.form.get('tipoSanguineo').setValue(this.aluno.fichaSaude.tipoSanguineo);
      this.form.get('doenca').setValue(this.aluno.fichaSaude.doenca);
      this.form.get('doencaDescricao').setValue(this.aluno.fichaSaude.doencaDescricao);
      this.form.get('medicamento').setValue(this.aluno.fichaSaude.medicamento);
      this.form.get('medicamentoDescricao').setValue(this.aluno.fichaSaude.medicamentoDescricao);
      this.form.get('suplemento').setValue(this.aluno.fichaSaude.suplemento);
      this.form.get('suplementoDescricao').setValue(this.aluno.fichaSaude.suplementoDescricao);
      this.form.get('deficiencia').setValue(this.aluno.fichaSaude.deficiencia);
      this.form.get('deficienciaDescricao').setValue(this.aluno.fichaSaude.deficienciaDescricao);
      this.form.get('alergia').setValue(this.aluno.fichaSaude.alergia);
      this.form.get('alergiaDescricao').setValue(this.aluno.fichaSaude.alergiaDescricao);
      this.form.get('intolerancia').setValue(this.aluno.fichaSaude.intolerancia);
      this.form.get('intoleranciaDescricao').setValue(this.aluno.fichaSaude.intoleranciaDescricao);

      this.loader.stopBackground();
    });

  }

  editar() {
    this.loader.startBackground();

    this.aluno.pessoa.nome = this.form.get('nome').value;
    this.aluno.pessoa.cpf = this.form.get('cpf').value;
    this.aluno.pessoa.dataNascimento = this.form.get('dataNascimento').value;
    this.aluno.pessoa.sexo = notVoidOrNull(this.form.get('sexo').value) ? this.form.get('sexo').value : null;
    this.aluno.pessoa.pai = this.form.get('pai').value;
    this.aluno.pessoa.mae = this.form.get('mae').value;
    this.aluno.pessoa.email = this.form.get('email').value;
    this.aluno.pessoa.telefone = this.form.get('telefone').value;
    this.aluno.pessoa.celular = this.form.get('celular').value;
    this.aluno.pessoa.endereco.cep = this.form.get('cep').value;
    this.aluno.pessoa.endereco.logradouro = this.form.get('logradouro').value;
    this.aluno.pessoa.endereco.numero = this.form.get('numero').value;
    this.aluno.pessoa.endereco.complemento = this.form.get('complemento').value;
    this.aluno.pessoa.endereco.bairro = this.form.get('bairro').value;
    this.aluno.pessoa.endereco.cidade = this.form.get('cidade').value;
    this.aluno.pessoa.endereco.estado = this.form.get('estado').value;
    this.aluno.fichaSaude.cartaoSus = this.form.get('cartaoSus').value;
    this.aluno.fichaSaude.tipoSanguineo = notVoidOrNull(this.form.get('tipoSanguineo').value) ? this.form.get('tipoSanguineo').value : null;
    this.aluno.fichaSaude.doenca = this.form.get('doenca').value;
    this.aluno.fichaSaude.doencaDescricao = this.form.get('doencaDescricao').value;
    this.aluno.fichaSaude.medicamento = this.form.get('medicamento').value;
    this.aluno.fichaSaude.medicamentoDescricao = this.form.get('medicamentoDescricao').value;
    this.aluno.fichaSaude.suplemento = this.form.get('suplemento').value;
    this.aluno.fichaSaude.suplementoDescricao = this.form.get('suplementoDescricao').value;
    this.aluno.fichaSaude.deficiencia = this.form.get('deficiencia').value;
    this.aluno.fichaSaude.deficienciaDescricao = this.form.get('deficienciaDescricao').value;
    this.aluno.fichaSaude.alergia = this.form.get('alergia').value;
    this.aluno.fichaSaude.alergiaDescricao = this.form.get('alergiaDescricao').value;
    this.aluno.fichaSaude.intolerancia = this.form.get('intolerancia').value;
    this.aluno.fichaSaude.intoleranciaDescricao = this.form.get('intoleranciaDescricao').value;

    this.alunoService.atualizar(this.aluno).subscribe(
      res => {
        this.router.navigate(['/home/aluno']);
        this.toastr.success('Aluno ' + res.codigo + ' - ' + res.pessoa.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar aluno: ' + err.error.message);
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
