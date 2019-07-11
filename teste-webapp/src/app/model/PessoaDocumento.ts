import { Pessoa } from 'src/app/model/Pessoa';

export class Documento {
  id: string;
  pessoa: Pessoa;
  documento: Documento;
}
