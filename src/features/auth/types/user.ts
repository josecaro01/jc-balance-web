import type { Role } from ".";


export type LoginCredentials =  { username:string, password: string };
export type RegisterCredentials = Omit<User, 'id' | 'creationDate' | 'roles'> & { password: string };

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  creationDate: string; 
  roles: Role[];
}
