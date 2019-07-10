import { Aluno } from './Aluno';
import { Receita } from './Receita';

export class RegistroAlimentar {
  codigo: number;
  aluno: Aluno;
  receita: Receita;
  observacoes: string;
  dataRegistro: Date;
}
