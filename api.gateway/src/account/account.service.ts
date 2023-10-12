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

  public messageFromMicroService(message) {
    return this.client.emit('message_from_microservice', message);
  }

  /**
   * Enregistrer les identité dans la BD
   * @param command
   * @returns identité
   */
  public register(command) {
    return this.client.send('register', command);
  }

  /**
   * Faire une Login des identités
   * @param command
   * @returns identité
   */
  public login(command) {
    return this.client.send('login', command);
  }

  /**
   *  Récupérer tous les identités
   * @returns identités
   */
  async getAll() {
    const result = this.client.send('getallidentity', '');
    return result;
  }

  /**
   * Récupérer une identités avec un Id
   * @param id
   * @returns identité
   */
  async getById(id: string) {
    const res = this.client.send('getidentitybyid', id);

    return res;
  }
}
