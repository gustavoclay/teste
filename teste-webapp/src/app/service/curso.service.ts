import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { Curso } from './../model/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/cursos';
  }

  pesquisar(pagina, max): Observable<Page<Curso>> {
    const params = { pagina, max };
    return this.http.get<Page<Curso>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Curso> {
    return this.http.get<Curso>(this.apiUrl + `/${codigo}`);
  }

  criar(curso: Curso): Observable<any> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  atualizar(curso: Curso): Observable<any> {
    return this.http.put<Curso>(this.apiUrl + `/${curso.codigo}`, curso);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
