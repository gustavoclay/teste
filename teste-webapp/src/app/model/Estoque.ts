import { Despensa } from './Despensa';
import { TipoMovimentacaoEstoqueEnum } from './enums/TipoMovimentacaoEstoqueEnum';
import { Produto } from './Produto';
import { Unidade } from './Unidade';


export class Estoque {
  codigo: number;
  produto: Produto;
  despensa: Despensa;
  unidade: Unidade;
  quantidade: number;
  lote: string;
  tipo: TipoMovimentacaoEstoqueEnum;
  dataValidade: Date;
  dataRegistro: Date;
  total: number;
}
