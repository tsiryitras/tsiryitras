import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { databaseProviders } from './database/database.providers';
import { identityProviders } from './database/identity.providers';

@Module({
  controllers: [IdentityController],
  providers: [IdentityService, ...databaseProviders, ...identityProviders],
  exports: [...databaseProviders, ...identityProviders],
})
export class IdentityModule {}
