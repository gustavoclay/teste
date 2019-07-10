import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Estoque } from '../model/Estoque';
import { Page } from '../model/Page';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/estoque';
  }

  pesquisar(pagina, max): Observable<Page<Estoque>> {
    const params = { pagina, max };
    return this.http.get<Page<Estoque>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.apiUrl + '/lista');
  }

  buscaPorDespensa(pagina, max, codigoDespensa): Observable<Page<Estoque>> {
    const params = { pagina, max, codigoDespensa };
    return this.http.get<Page<Estoque>>(this.apiUrl + '/despensa', { params });
  }

  criar(estoque: Estoque): Observable<any> {
    return this.http.post<Estoque>(this.apiUrl, estoque);
  }

  atualizar(estoque: Estoque): Observable<any> {
    return this.http.put<Estoque>(this.apiUrl + `/${estoque.codigo}`, estoque);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
