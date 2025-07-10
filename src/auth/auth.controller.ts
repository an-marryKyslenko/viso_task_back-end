import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

type User = {
	email: string;
	password: string;
	firstName: string;
	lastName: string
}

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	async register(@Body() body: User) {
		return this.authService.register(body.email, body.password, body.firstName, body.lastName);
	}

	@Post('login')
	async login(@Body() body) {
		return this.authService.login(body.email, body.password);
	}
}
