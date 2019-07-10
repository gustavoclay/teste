import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { AlunoRestricaoAlimentar } from 'src/app/model/AlunoRestricaoAlimentar';
import { RestricaoAlimentar } from 'src/app/model/RestricaoAlimentar';
import { AlunoRestricaoAlimentarService } from 'src/app/service/aluno-restricao-alimentar.service';
import { AlunoService } from 'src/app/service/aluno.service';
import { RestricaoAlimentarService } from 'src/app/service/restricao-alimentar.service';




@Component({
  selector: 'app-aluno-restricao-alimentar',
  templateUrl: './aluno-restricao-alimentar.component.html'
})
export class AlunoRestricaoAlimentarComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup;

  aluno: Aluno;
  restricoes: AlunoRestricaoAlimentar[];
  restricoesDisponiveis: RestricaoAlimentar[];

  constructor(
    private alunoService: AlunoService,
    private alunoRestricaoAlimentarService: AlunoRestricaoAlimentarService,
    private restricaoAlimentarService: RestricaoAlimentarService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({ restricaoAlimentar: [''] });

    const codigo = this.activatedRoute.snapshot.params.codigo;

    this.loader.startBackground();

    this.alunoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.aluno = res;
      // restricoes do aluno
      this.alunoRestricaoAlimentarService.buscaPorAluno(this.aluno.codigo).subscribe(resp => {
        this.restricoes = resp;
      }, err => {
        this.toast.error('Erro ao carregar Restrições alimentares: ' + err.error.message);
      });
      // restricoes disponiveis
      this.restricaoAlimentarService.listaTodos().subscribe(response => {
        this.restricoesDisponiveis = response;
      }, err => {
        this.toast.error('Erro ao carregar Restrições alimentares: ' + err.error.message);
      });

      this.loader.stopBackground();
    }, err => {
      this.toast.error('Erro ao carregar Aluno: ' + err.error.message);
      this.loader.stopBackground();
    });

    this.loader.stopBackground();
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

  isSimNao(valor: boolean) {
    if (valor === true) { return 'Sim'; } else if (valor === false) { return 'Não'; }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  adicionarRestricoes() {
    const restricoesAdicionadas: RestricaoAlimentar[] = this.form.get('restricaoAlimentar').value;
    console.log(restricoesAdicionadas);
    if (restricoesAdicionadas.length > 0) {
      this.loader.startBackground();
      this.alunoRestricaoAlimentarService.criar(restricoesAdicionadas, this.aluno.codigo).subscribe(res => {
        this.alunoRestricaoAlimentarService.buscaPorAluno(this.aluno.codigo).subscribe(resp => {
          this.restricoes = resp;
          this.closeModal();
        }, err => {
          this.toast.error('Erro ao carregar Restrições alimentares: ' + err.error.message);
        });
        this.toast.success('Restrições adicionadas com sucesso!');
        this.loader.stopBackground();
      }, err => {
        this.toast.error('Erro ao adicionar restrições alimentares: ' + err.error.message);
        this.loader.stopBackground();
      });
    }
  }

  removerRestricao(restricao: RestricaoAlimentar) {
    this.loader.startBackground();
    this.alunoRestricaoAlimentarService.remover(restricao.codigo).subscribe(res => {
      this.alunoRestricaoAlimentarService.buscaPorAluno(this.aluno.codigo).subscribe(resp => {
        this.restricoes = resp;
      }, err => {
        this.toast.error('Erro ao carregar Restrições alimentares: ' + err.error.message);
      });
      this.toast.success('Restricao removida com sucesso!');
      this.loader.stopBackground();
    }, err => {
      this.toast.error('Erro ao remover restrições alimentares: ' + err.error.message);
      this.loader.stopBackground();
    });
  }

}
