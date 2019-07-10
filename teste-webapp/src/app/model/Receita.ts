import { TipoReceitaEnum } from './enums/TipoReceitaEnum';
export class Receita {
  codigo: number;
  nome: string;
  descricao: string;
  ingredientes: string;
  modoPreparo: string;
  tipoReceita: TipoReceitaEnum;
}
