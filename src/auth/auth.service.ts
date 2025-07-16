import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { NewUser, User } from "./auth.type";
import { generateTokens } from "./local.strategy";

export const normalizedUser = (user: User) => {
	return {
		id: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	}
}

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async register({email, password, lastName, firstName}: NewUser) {
		const user = await this.usersService.createUser(email, password, lastName, firstName);
		
		return await generateTokens(user, this.jwtService)
	}

	async login({email, password}: {email: string, password: string}) {
		const user = await this.usersService.findByEmail(email);
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException();
		}
		
		return await generateTokens(user, this.jwtService)
	}
}
