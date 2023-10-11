import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityService {
  constructor() {}

  async hello(message) {
    return message;
  }
}
