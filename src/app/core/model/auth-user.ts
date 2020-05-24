import { AuthProvider } from './auth-provider';

export class AuthUser {

  public constructor(public readonly displayName: string,
                     public readonly email: string,
                     public readonly photoUrl: string | undefined,
                     public readonly provider: AuthProvider) {
  }

}
