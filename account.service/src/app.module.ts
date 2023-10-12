import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [IdentityModule, JwtModule, PassportModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule, PassportModule],
})
export class AppModule {}
