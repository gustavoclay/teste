import { Aluno } from './Aluno';
import { ResultadoIMCEnum } from './enums/ResultadoIMCEnum';

export class RegistroNutricional {
  codigo: number;
  aluno: Aluno;
  peso: number | string;
  altura: number | string;
  imc: number | string;
  resultado: ResultadoIMCEnum;
  dataRegistro: Date;
}
