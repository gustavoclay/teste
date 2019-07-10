import { Endereco } from './Endereco';
import { SexoEnum } from './enums/SexoEnum';

export class Pessoa {
  codigo: number;
  ativo: boolean;
  nome: string;
  pai: string;
  mae: string;
  cpf: string;
  email: string;
  telefone: string;
  celular: string;
  endereco: Endereco;
  sexo: SexoEnum;
  dataNascimento: Date;
}
