import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AccountService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'account_service_queue',
      },
    });
  }

  public hello() {
    /**
     * helloFromAPi : Message pattern pour envoyer vers les micro services
     * Hello from API Gateway! : Le message a envoyer
     */
    return this.client.send('helloFromAPi', 'Hello from API Gateway!');
  }
}
