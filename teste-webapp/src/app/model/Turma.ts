import { Curso } from './Curso';
import { PeriodoEnum } from './enums/PeriodoEnum';

export class Turma {
  codigo: number;
  nome: string;
  sala: string;
  ativo: boolean;
  curso: Curso;
  dataInicio: Date;
  dataFim: Date;
  periodo: PeriodoEnum;
}
