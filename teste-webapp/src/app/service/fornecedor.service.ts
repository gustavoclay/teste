import { Fornecedor } from './../model/Fornecedor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/fornecedores';
  }

  pesquisar(pagina, max): Observable<Page<Fornecedor>> {
    const params = { pagina, max };
    return this.http.get<Page<Fornecedor>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(this.apiUrl + `/${codigo}`);
  }

  criar(fornecedor: Fornecedor): Observable<any> {
    return this.http.post<Fornecedor>(this.apiUrl, fornecedor);
  }

  atualizar(fornecedor: Fornecedor): Observable<any> {
    return this.http.put<Fornecedor>(this.apiUrl + `/${fornecedor.codigo}`, fornecedor);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }


}
