export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string; // ISO date string
}

export interface UserInput {
  email: string;
  password_hash: string;
}
