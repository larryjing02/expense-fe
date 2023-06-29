export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}
