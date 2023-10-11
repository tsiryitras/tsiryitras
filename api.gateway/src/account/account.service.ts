import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AccountService {
  /**
   * Injection du ClientProxy: Le receveur de message
   */
  private client: ClientProxy;

  constructor() {
    /**
     * Configuration du RabbitMq dans le Gateway
     * Les messages entre Gateway et microservices
     */
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'account_service_queue',
      },
    });
  }

  /**
   * .send() : envoie une message vers les microservices
   * helloFromAPi : Message pattern pour envoyer vers les micro services
   * message : Le message a envoyer
   */
  public messageToMicroService() {
    const message = 'Message a envoyer vers les microservices';

    return this.client.send('message_to_microservice', message);
  }
}
