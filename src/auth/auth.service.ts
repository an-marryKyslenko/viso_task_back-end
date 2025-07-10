import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async register(email: string, password: string, firstName: string, lastName: string) {
		const user = await this.usersService.createUser(email, password, lastName, firstName);
		return {
			token: this.jwtService.sign({ sub: user.id, email: user.email }),
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		};
	}

	async login(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException();
		}
		
		return {
			token: this.jwtService.sign({ sub: user.id, email: user.email }),
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		}
	}
}
