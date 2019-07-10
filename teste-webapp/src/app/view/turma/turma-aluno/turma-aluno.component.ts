import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { Turma } from 'src/app/model/Turma';
import { TurmaAluno } from 'src/app/model/TurmaAluno';
import { AlunoService } from 'src/app/service/aluno.service';

import { TurmaAlunoService } from './../../../service/turma-aluno.service';
import { TurmaService } from './../../../service/turma.service';




@Component({
  selector: 'app-turma-aluno',
  templateUrl: './turma-aluno.component.html'
})
export class TurmaAlunoComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup;

  turma: Turma;
  alunos: TurmaAluno[];
  alunosDisponiveis: Aluno[];

  constructor(
    private turmaAlunoService: TurmaAlunoService,
    private alunoService: AlunoService,
    private turmaService: TurmaService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({ alunos: [''] });

    const codigo = this.activatedRoute.snapshot.params.codigo;

    this.loader.startBackground();

    this.turmaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.turma = res;
      // alunos da turma
      this.turmaAlunoService.buscaPorTurma(this.turma.codigo).subscribe(resp => {
        this.alunos = resp;
      }, err => {
        this.toast.error('Erro ao carregar alunos da turma : ' + err.error.message);
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
    // alunos disponiveis
    this.loader.startBackground();
    this.alunoService.listaTodos().subscribe(response => {
      this.alunosDisponiveis = response;
      this.loader.stopBackground();
    }, err => {
      this.toast.error('Erro ao carregar alunos disponíveis: ' + err.error.message);
      this.loader.stopBackground();
    });
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  closeModal() {
    this.modalRef.hide();
  }

  adicionarAlunos() {
    const alunosSelecionados: Aluno[] = this.form.get('alunos').value;
    console.log(alunosSelecionados);
    if (alunosSelecionados.length > 0) {
      this.loader.startBackground();
      this.turmaAlunoService.criar(alunosSelecionados, this.turma.codigo).subscribe(res => {
        this.turmaAlunoService.buscaPorTurma(this.turma.codigo).subscribe(resp => {
          this.alunos = resp;
          this.closeModal();
        }, err => {
          this.toast.error('Erro ao carregar Alunos da Turma: ' + err.error.message);
        });
        this.toast.success('Alunos adicionados com sucesso!');
        this.loader.stopBackground();
      }, err => {
        this.toast.error('Erro ao adicionar alunos: ' + err.error.message);
        this.loader.stopBackground();
      });
    }
  }

  removerAluno(turmaAluno: TurmaAluno) {
    this.loader.startBackground();
    this.turmaAlunoService.remover(turmaAluno.codigo).subscribe(res => {
      this.turmaAlunoService.buscaPorTurma(this.turma.codigo).subscribe(resp => {
        this.alunos = resp;
      }, err => {
          this.toast.error('Erro ao carregar Alunos da Turma: ' + err.error.message);
      });
      this.toast.success('Aluno removido com sucesso!');
      this.loader.stopBackground();
    }, err => {
      this.toast.error('Erro ao remover aluno: ' + err.error.message);
      this.loader.stopBackground();
    });
  }

}
