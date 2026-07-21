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
  /** How many salary payments per year (13th/14th salary). Annual salary is derived as salary * salaryMonths. */
  salaryMonths: 12 | 13 | 14;
  vocationsDay: number;
  role: Role;
  tipoSanguineo?: string;
  location: string;
  manager?: string;
  isAdmin: boolean;
  /** Optional profile photo. Falls back to an initials avatar in the UI when absent. */
  photoUrl?: string;
  /** Soft-delete flag: false means the record is hidden from the roster, never physically deleted. */
  active: boolean;
  /** Mirrors the Firebase Auth `disabled` flag (inverted). False until an admin activates the account. */
  accountEnabled: boolean;
  createdAt: string;
};

export type FuncionarioPhoto = {
  buffer: Buffer;
  contentType: string;
};

export type FuncionarioInput = {
  name: string;
  email: string;
  password: string;
  telefone: string;
  age: number;
  salary: number;
  salaryMonths: 12 | 13 | 14;
  vocationsDay: number;
  role: Role;
  tipoSanguineo?: string;
  location: string;
  manager?: string;
  photo?: FuncionarioPhoto;
};

export type FuncionarioUpdateInput = Omit<FuncionarioInput, "password" | "email">;
