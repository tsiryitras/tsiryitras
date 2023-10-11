import { Controller } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  /**
   * helloFromAPi : Message pattern du Gateway
   */
  @MessagePattern('helloFromAPi')
  hello(req) {
    console.log(req);
    return this.identityService.hello(req);
  }
}
