import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IdentityService } from './identity.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly identityService: IdentityService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my_secretKey',
    });
  }

  async validate(payload) {
    const { id } = payload;
    console.log(payload);

    const user = await this.identityService.getById(id);

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user;
  }
}
