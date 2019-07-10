import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestricaoAlimentar } from 'src/app/model/RestricaoAlimentar';
import { environment } from 'src/environments/environment';

import { AlunoRestricaoAlimentar } from '../model/AlunoRestricaoAlimentar';



@Injectable({
  providedIn: 'root'
})
export class AlunoRestricaoAlimentarService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/alunos_restricoes_alimentares';
  }

  buscaPorAluno(codigoAluno: number): Observable<AlunoRestricaoAlimentar[]> {
    return this.http.get<AlunoRestricaoAlimentar[]>(this.apiUrl + `/?codigoAluno=${codigoAluno}`);
  }

  criar(restricoes: RestricaoAlimentar[], codigoAluno: number): Observable<any> {
    return this.http.post<RestricaoAlimentar[]>(this.apiUrl + `/?codigoAluno=${codigoAluno}`, restricoes);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
