import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from 'src/constants';

@Module({
	imports: [
		UsersModule, 
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret, 
		})
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		}
	],
	controllers: [AuthController],
})
export class AuthModule {}
