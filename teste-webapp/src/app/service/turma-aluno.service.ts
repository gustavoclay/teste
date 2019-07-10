import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Aluno } from '../model/Aluno';
import { TurmaAluno } from '../model/TurmaAluno';



@Injectable({
  providedIn: 'root'
})
export class TurmaAlunoService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/turmas_alunos';
  }

  listaTodos(): Observable<TurmaAluno[]> {
    return this.http.get<TurmaAluno[]>(this.apiUrl + '/lista');
  }

  buscaPorTurma(codigoTurma: number): Observable<TurmaAluno[]> {
    return this.http.get<TurmaAluno[]>(this.apiUrl + `/turma?codigoTurma=${codigoTurma}`);
  }

  buscaPorAluno(codigoAluno: number): Observable<TurmaAluno[]> {
    return this.http.get<TurmaAluno[]>(this.apiUrl + `/aluno?codigoAluno=${codigoAluno}`);
  }

  criar(alunos: Aluno[], codigoTurma: number): Observable<any> {
    return this.http.post<TurmaAluno[]>(this.apiUrl + `?codigoTurma=${codigoTurma}`, alunos);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
