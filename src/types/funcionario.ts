export enum Role {
  PROFESSOR = 'PROFESSOR',
  ATENDENTE = 'ATENDENTE',
  GERENTE = 'GERENTE',
  FAXINEIRA = 'FAXINEIRA',
  PROFESSOR_TEMPORARIO = 'PROFESSOR_TEMPORARIO',
}

export type Funcionario = {
  id: string;
  name: string;
  email: string;
  telefone: string;
  age: number;
  salary: number;
  anualSalary: number;
  vocationsDay: number;
  role: Role;
  tipoSanguineo?: string;
  location: string;
  manager?: string;
  isAdmin: boolean;
};
