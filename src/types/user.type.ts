export interface IUser {
   _id: string,
   name: string,
   email: string,
   status: string,
   avatar: string,
   token: string
}
export interface AuthType {
   name: string,
   email: string,
   password: string,
   confirm_password: string
   status?: string,
}
export type LoginType = Pick<AuthType, 'email' | 'password'>;
export type RegisterType = AuthType;