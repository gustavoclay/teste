import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/produtos';
  }

  listaTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl + '/lista');
  }

  pesquisar(pagina, max): Observable<Page<Produto>> {
    const params = { pagina, max };
    return this.http.get<Page<Produto>>(this.apiUrl, { params });
  }

  buscaPeloCodigo(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(this.apiUrl + `/${codigo}`);
  }

  criar(produto: Produto): Observable<any> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizar(produto: Produto): Observable<any> {
    return this.http.put<Produto>(this.apiUrl + `/${produto.codigo}`, produto);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }


}
