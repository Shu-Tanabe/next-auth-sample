import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { join } from 'path';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [UserModule],
      driver: ApolloDriver,
      useFactory: async () => {
        return {
          autoSchemaFile: join(
            process.cwd(),
            'src/graphql/generated/schema.gql',
          ),
          sortSchema: true,
        };
      },
    }),
    JwtModule.register({ global: true, secret: process.env.NEXTAUTH_SECRET }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
