import { Pessoa } from './Pessoa';
import { FichaSaude } from './FichaSaude';
import { RestricaoAlimentar } from './RestricaoAlimentar';

export class Funcionario {
  codigo: number;
  pessoa: Pessoa;
  formacao: string;
  area: string;
  dataMatricula: Date;
  dataSaida: Date;
}
