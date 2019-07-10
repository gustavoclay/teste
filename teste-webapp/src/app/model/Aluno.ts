import { Pessoa } from './Pessoa';
import { FichaSaude } from './FichaSaude';
import { RestricaoAlimentar } from './RestricaoAlimentar';

export class Aluno {
  codigo: number;
  pessoa: Pessoa;
  dataMatricula: Date;
  fichaSaude: FichaSaude;
  restricoesAlimentares: RestricaoAlimentar[];
}
