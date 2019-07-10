import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { Turma } from '../model/Turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/turmas';
  }

  pesquisar(pagina, max): Observable<Page<Turma>> {
    const params = { pagina, max };
    return this.http.get<Page<Turma>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Turma> {
    return this.http.get<Turma>(this.apiUrl + `/${codigo}`);
  }

  criar(turma: Turma): Observable<any> {
    return this.http.post<Turma>(this.apiUrl, turma);
  }

  atualizar(turma: Turma): Observable<any> {
    return this.http.put<Turma>(this.apiUrl + `/${turma.codigo}`, turma);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
