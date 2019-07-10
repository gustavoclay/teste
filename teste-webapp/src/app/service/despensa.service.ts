import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { Despensa } from '../model/Despensa';

@Injectable({
  providedIn: 'root'
})
export class DespensaService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/despensa';
  }

  pesquisar(pagina, max): Observable<Page<Despensa>> {
    const params = { pagina, max };
    return this.http.get<Page<Despensa>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Despensa[]> {
    return this.http.get<Despensa[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Despensa> {
    return this.http.get<Despensa>(this.apiUrl + `/${codigo}`);
  }

  criar(despensa: Despensa): Observable<any> {
    return this.http.post<Despensa>(this.apiUrl, despensa);
  }

  atualizar(despensa: Despensa): Observable<any> {
    return this.http.put<Despensa>(this.apiUrl + `/${despensa.codigo}`, despensa);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
