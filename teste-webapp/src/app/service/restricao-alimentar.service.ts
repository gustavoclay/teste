import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { RestricaoAlimentar } from './../model/RestricaoAlimentar';

@Injectable({
  providedIn: 'root'
})
export class RestricaoAlimentarService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/restricoes-alimentares';
  }

  pesquisar(pagina, max): Observable<Page<RestricaoAlimentar>> {
    const params = { pagina, max };
    return this.http.get<Page<RestricaoAlimentar>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<RestricaoAlimentar[]> {
    return this.http.get<RestricaoAlimentar[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<RestricaoAlimentar> {
    return this.http.get<RestricaoAlimentar>(this.apiUrl + `/${codigo}`);
  }

  criar(restricaoAlimentar: RestricaoAlimentar): Observable<any> {
    return this.http.post<RestricaoAlimentar>(this.apiUrl, restricaoAlimentar);
  }

  atualizar(restricaoAlimentar: RestricaoAlimentar): Observable<any> {
    return this.http.put<RestricaoAlimentar>(this.apiUrl + `/${restricaoAlimentar.codigo}`, restricaoAlimentar);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
