import { Controller } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { MessagePattern } from '@nestjs/microservices';

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
}
