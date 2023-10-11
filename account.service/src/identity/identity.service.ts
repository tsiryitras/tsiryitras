import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityService {
  constructor() {}

  async messageFromGateway(message) {
    return message;
  }
}
