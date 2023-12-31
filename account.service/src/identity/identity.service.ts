import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Identity } from './schemas/identity.schema';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginIdentityDto } from './dto/login.identity.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IdentityService {
  constructor(
    @Inject('IDENTITY_MODEL') private identityModel: Model<Identity>,
    private jwtService: JwtService,
  ) {}

  async messageFromGateway(message) {
    return message;
  }

  async messageToGateway(message) {
    return message;
  }

  /**
   *
   */
  async register(createIdentityDto: CreateIdentityDto): Promise<any> {
    const identity = await this.identityModel.create(createIdentityDto);
    console.log(identity);

    return identity;
  }

  async login(loginIdentityDto: LoginIdentityDto): Promise<any> {
    console.log('username: ' + loginIdentityDto.userName);

    const identity = await this.identityModel.findOne({
      userName: loginIdentityDto.userName,
    });
    if (!identity) {
      return 'Aucun identité trouvé';
    } else {
      const checkedPass = identity.password === loginIdentityDto.password;
      if (!checkedPass) {
        return 'Mot de passe incorrect';
      }
      const token = this.jwtService.sign({ id: identity._id });
      console.log(token);

      const tokenVal = this.jwtService.decode(token);

      console.log(tokenVal);

      return {
        token: token,
        userName: identity.userName,
      };
    }
  }

  async getAll(): Promise<Identity[]> {
    const identity = await this.identityModel.find();
    return identity;
  }

  async getById(id: string): Promise<Identity | any> {
    console.log(id);

    const identity = await this.identityModel.findById(id);
    if (!identity) {
      return 'Identité non trouvé';
    }
    return identity;
  }
}
