import { Unidade } from './Unidade';
import { Fornecedor } from 'src/app/model/Fornecedor';

export class Produto {
  codigo: number;
  nome: string;
  descricao: string;
  quantidadeMinima: number;
  marca: string;
  unidade: Unidade;
  fornecedor: Fornecedor;
}
