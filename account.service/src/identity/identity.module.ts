import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { databaseProviders } from './database/database.providers';
import { identityProviders } from './database/identity.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt.auth-guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule.register({
      secret: 'my_secretKey',
      signOptions: { expiresIn: 3264561 },
    }),
  ],
  controllers: [IdentityController],
  providers: [
    IdentityService,
    ...databaseProviders,
    ...identityProviders,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [
    ...databaseProviders,
    ...identityProviders,
    JwtModule,
    PassportModule,
  ],
})
export class IdentityModule {}
