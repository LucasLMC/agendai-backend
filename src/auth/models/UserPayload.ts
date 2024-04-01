export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  tenant: string;
  iat?: number;
  exp?: number;
}
