import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('message_to')
  sendMessage(): any {
    return this.accountService.messageToMicroService();
  }

  @Post('message_from')
  getMessage(@Body() msg: any): any {
    console.log(msg.message);

    return this.accountService.messageFromMicroService(msg.message);
  }

  @Post('sign-up')
  async signUp(@Request() req: any): Promise<any> {
    return this.accountService.register(req.body);
  }

  @Post('sign-in')
  async signIn(@Request() req: any): Promise<any> {
    return this.accountService.login(req.body);
  }

  @Get('getall')
  async getAll(): Promise<any> {
    try {
      const identity = await this.accountService.getAll();
      return identity;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    const res = await this.accountService.getById(id);
    return res;
  }
}
