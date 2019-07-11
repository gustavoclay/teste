import { Estados } from './enums/Estados';

export class Pessoa {
  id: number;
  nome: string;
  email: string;
  dataNascimento: Date;
  estado: Estados;
}
