import { Aluno } from './Aluno';
import { TipoSanguineoEnum } from './enums/TipoSanguineoEnum';

export class FichaSaude {
  codigo: number;
  aluno: Aluno;
  cartaoSus: string;
  tipoSanguineo: TipoSanguineoEnum;
  doenca: boolean;
  doencaDescricao: string;
  medicamento: boolean;
  medicamentoDescricao: string;
  suplemento: boolean;
  suplementoDescricao: string;
  deficiencia: boolean;
  deficienciaDescricao: string;
  alergia: boolean;
  alergiaDescricao: string;
  intolerancia: boolean;
  intoleranciaDescricao: string;
}
