import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthConfig } from './auth.config';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authConfig: AuthConfig,
    private userService: ApiUsersRepositoryDataAccessService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256'],
    });
    console.log(authConfig)
  }

  public async validate(payload: any) {
    return !!payload.sub;
  }
}