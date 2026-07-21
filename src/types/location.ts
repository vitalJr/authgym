export const COUNTRIES = ["Portugal", "Brasil", "Espanha", "França"] as const;

export type Country = (typeof COUNTRIES)[number];

export type Location = {
  id: string;
  name: string;
  description?: string;
  city: string;
  country: Country;
  createdAt: string;
};

export type LocationInput = {
  id: string;
  name: string;
  description?: string;
  city: string;
  country: Country;
};
