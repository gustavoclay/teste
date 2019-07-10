import { Pessoa } from './Pessoa';
import { FichaSaude } from './FichaSaude';
import { RestricaoAlimentar } from './RestricaoAlimentar';
import { Endereco } from './Endereco';

export class Fornecedor {
  codigo: number;
  nome: string;
  cpfCnpj: string;
  endereco: Endereco;
  telefone: string;
  celular: string;
  email: string;
  responsavel: string;
}
