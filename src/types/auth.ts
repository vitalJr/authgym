export type LoginCredentials = {
  identifier: string;
  password: string;
};

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  username?: string;
};

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  birthDate: string;
  gender: string;
};

export type RegisteredUser = {
  id: string;
  username: string;
  email: string;
};

export type UserRecord = {
  username: string;
  email: string;
  birthDate?: string;
  gender?: string;
  createdAt: string;
};
