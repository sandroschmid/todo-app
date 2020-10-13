import { AuthProvider } from './auth-provider';

export interface AuthUser {

  readonly displayName: string,
  readonly email: string,
  readonly photoUrl: string | undefined,
  readonly provider: AuthProvider;

}
