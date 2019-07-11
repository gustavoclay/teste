import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { Pessoa } from '../model/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/pessoas';
  }

  findAll(pag, max): Observable<Page<Pessoa>> {
    const params = { pag, max };
    return this.http.get<Page<Pessoa>>(this.apiUrl, { params });
  }

  findById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.apiUrl + `/${id}`);
  }

  save(pessoa: Pessoa): Observable<any> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

  update(pessoa: Pessoa): Observable<any> {
    return this.http.put<Pessoa>(this.apiUrl + `/${pessoa.id}`, pessoa);
  }

  remover(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

}
