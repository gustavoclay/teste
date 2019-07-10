interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Alunos',
    url: 'aluno',
    icon: 'fa fa-user-graduate'
  },
  {
    name: 'Cursos',
    url: 'curso',
    icon: 'fa fa-award'
  },
  {
    name: 'Turmas',
    url: 'turma',
    icon: 'fa fa-graduation-cap'
  },
  {
    name: 'Restrições Alimentares',
    url: 'restricao-alimentar',
    icon: 'fa fa-leaf'
  },
  {
    name: 'Receita',
    url: 'receita',
    icon: 'fa fa-apple-alt'
  },
  {
    name: 'Estoque',
    url: 'estoque',
    icon: 'fa fa-cubes'
  },
  {
    name: 'Produtos',
    url: 'produto',
    icon: 'fa fa-shopping-cart'
  },
  {
    name: 'Unidades',
    url: 'unidade',
    icon: 'fa fa-ruler-vertical'
  },
  {
    name: 'Despensa',
    url: 'despensa',
    icon: 'fa fa-file'
  },
  {
    name: 'Fornecedores',
    url: 'fornecedor',
    icon: 'fa fa-truck'
  },
  {
    name: 'Funcionarios',
    url: 'funcionario',
    icon: 'fa fa-user-tie'
  }
];
