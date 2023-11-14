export interface user {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  picture: string;
  Role: string;
  iat: number;
}

export interface loginInput {
  username: string;
  password: string;
}
