import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { Identity } from './schemas/identity.schema';
import { LoginIdentityDto } from './dto/login.identity.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly identityService: IdentityService) {
    super();
  }

  async validate(username: string, password: string): Promise<Identity | any> {
    console.log(username, password);

    const userLoginData: LoginIdentityDto = { userName: username, password };
    const identity = await this.identityService.login(userLoginData);
    console.log(identity);

    if (!identity) {
      console.log('Erreur');

      //   throw new UnauthorizedException();
    }
    return identity;
  }
}
