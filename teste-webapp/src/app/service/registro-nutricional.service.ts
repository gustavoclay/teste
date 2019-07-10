import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Page } from '../model/Page';
import { RegistroNutricional } from './../model/RegistroNutricional';



@Injectable({
  providedIn: 'root'
})
export class RegistroNutricionalService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/registros-nutricionais';
  }

  pesquisarPorAluno(codigoAluno, pagina, max): Observable<Page<RegistroNutricional>> {
    const params = { codigoAluno, pagina, max };
    return this.http.get<Page<RegistroNutricional>>(this.apiUrl, { params });
  }

  buscaPorCodigo(codigo: number): Observable<RegistroNutricional> {
    return this.http.get<RegistroNutricional>(this.apiUrl + `/${codigo}`);
  }

  criar(registro: RegistroNutricional): Observable<any> {
    return this.http.post<RegistroNutricional>(this.apiUrl, registro);
  }

  atualizar(registro: RegistroNutricional): Observable<any> {
    return this.http.put<RegistroNutricional>(this.apiUrl + `/${registro.codigo}`, registro);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
