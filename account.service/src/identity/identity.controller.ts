import { Controller, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { MessagePattern } from '@nestjs/microservices';
import { Identity } from './schemas/identity.schema';
import { JwtAuthGuard } from './jwt.auth-guard';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  /**
   * helloFromAPi : Message pattern du Gateway
   */
  @MessagePattern('message_to_microservice')
  msgFromGateway(req) {
    console.log('Le message du Gateway: ' + req);
    return this.identityService.messageFromGateway(req);
  }

  /**
   * helloFromAPi : Message pattern du Gateway
   */
  @MessagePattern('message_from_microservice')
  msgToGateway(req) {
    console.log('Le message de microservice: ' + req);
    return this.identityService.messageToGateway(req);
  }

  @MessagePattern('register')
  async signUp(command): Promise<any> {
    console.log(command);

    return this.identityService.register(command);
  }

  @MessagePattern('login')
  async signIn(command): Promise<any> {
    console.log(command);

    return this.identityService.login(command);
  }

  @MessagePattern('getallidentity')
  async getAll(): Promise<Identity[]> {
    const identity = await this.identityService.getAll();
    return identity;
  }

  @MessagePattern('getidentitybyid')
  async getById(id): Promise<Identity> {
    const identity = await this.identityService.getById(id);
    return identity;
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('me')
  async me(command): Promise<any> {
    const { id, ...rest } = command;
    console.log(id, rest);

    return rest;
  }
}
