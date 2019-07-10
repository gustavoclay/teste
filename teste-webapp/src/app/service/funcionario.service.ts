import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Funcionario } from '../model/Funcionario';
import { Page } from '../model/Page';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/funcionarios';
  }

  pesquisar(pagina, max): Observable<Page<Funcionario>> {
    const params = { pagina, max };
    return this.http.get<Page<Funcionario>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(this.apiUrl + `/${codigo}`);
  }

  criar(funcionario: Funcionario): Observable<any> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  atualizar(funcionario: Funcionario): Observable<any> {
    return this.http.put<Funcionario>(this.apiUrl + `/${funcionario.codigo}`, funcionario);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
