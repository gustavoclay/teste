import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { Unidade } from './../model/Unidade';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/unidades';
  }

  pesquisar(pagina, max): Observable<Page<Unidade>> {
    const params = { pagina, max };
    return this.http.get<Page<Unidade>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Unidade> {
    return this.http.get<Unidade>(this.apiUrl + `/${codigo}`);
  }

  criar(unidade: Unidade): Observable<any> {
    return this.http.post<Unidade>(this.apiUrl, unidade);
  }

  atualizar(unidade: Unidade): Observable<any> {
    return this.http.put<Unidade>(this.apiUrl + `/${unidade.codigo}`, unidade);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
