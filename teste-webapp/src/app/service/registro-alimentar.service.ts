import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { RegistroAlimentar } from '../model/RegistroAlimentar';



@Injectable({
  providedIn: 'root'
})
export class RegistroAlimentarService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/registros-alimentares';
  }

  pesquisarPorAluno(codigoAluno, pagina, max): Observable<Page<RegistroAlimentar>> {
    const params = { codigoAluno, pagina, max };
    return this.http.get<Page<RegistroAlimentar>>(this.apiUrl, { params });
  }

  buscaPorCodigo(codigo: number): Observable<RegistroAlimentar> {
    return this.http.get<RegistroAlimentar>(this.apiUrl + `/${codigo}`);
  }

  criar(registro: RegistroAlimentar): Observable<any> {
    return this.http.post<RegistroAlimentar>(this.apiUrl, registro);
  }

  atualizar(registro: RegistroAlimentar): Observable<any> {
    return this.http.put<RegistroAlimentar>(this.apiUrl + `/${registro.codigo}`, registro);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
