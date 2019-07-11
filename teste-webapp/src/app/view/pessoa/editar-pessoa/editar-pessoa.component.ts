import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco as EnderecoViaCep, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Pessoa } from 'src/app/model/Pessoa';
import { FormValidations } from 'src/app/model/utils/FormValidations';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html'
})
export class EditarPessoaComponent implements OnInit {

  pessoa: Pessoa;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]

    });

    const id = this.activatedRoute.snapshot.params.codigo;
    this.pessoaService.findById(id).subscribe(res => {
      this.loader.startBackground();
      this.pessoa = res;
      this.form.get('nome').setValue(this.pessoa.nome);
      this.form.get('dataNascimento').setValue(this.pessoa.dataNascimento);
      this.form.get('email').setValue(this.pessoa.email);
      this.loader.stopBackground();
    });

  }

  editar() {
    this.loader.startBackground();
    this.pessoa.nome = this.form.get('nome').value;
    this.pessoa.dataNascimento = this.form.get('dataNascimento').value;
    this.pessoa.email = this.form.get('email').value;
    this.pessoaService.update(this.pessoa).subscribe(
      res => {
        this.router.navigate(['/home/pessoas']);
        this.toastr.success('Pessoa ' + res.id + ' - ' + res.pessoa.nome + ' editada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar pessoa: ' + err.error.message);
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
