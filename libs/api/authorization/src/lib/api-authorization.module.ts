import { Module } from '@nestjs/common';
import { AuthConfig } from './auth.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [],
  providers: [AuthConfig, JwtStrategy, ApiUsersRepositoryDataAccessService, PrismaService],
  exports: [],
})
export class ApiAuthorizationModule {}
