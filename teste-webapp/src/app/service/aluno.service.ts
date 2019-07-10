import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Aluno } from '../model/Aluno';
import { Page } from '../model/Page';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/alunos';
  }

  pesquisar(pagina, max): Observable<Page<Aluno>> {
    const params = { pagina, max };
    return this.http.get<Page<Aluno>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Aluno> {
    return this.http.get<Aluno>(this.apiUrl + `/${codigo}`);
  }

  criar(aluno: Aluno): Observable<any> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  atualizar(aluno: Aluno): Observable<any> {
    return this.http.put<Aluno>(this.apiUrl + `/${aluno.codigo}`, aluno);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
