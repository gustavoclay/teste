import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { Receita } from '../model/Receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/receitas';
  }

  pesquisar(pagina, max): Observable<Page<Receita>> {
    const params = { pagina, max };
    return this.http.get<Page<Receita>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Receita> {
    return this.http.get<Receita>(this.apiUrl + `/${codigo}`);
  }

  criar(receita: Receita): Observable<any> {
    return this.http.post<Receita>(this.apiUrl, receita);
  }

  atualizar(receita: Receita): Observable<any> {
    return this.http.put<Receita>(this.apiUrl + `/${receita.codigo}`, receita);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
