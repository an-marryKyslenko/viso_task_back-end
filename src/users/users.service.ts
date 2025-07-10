import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async createUser(email: string, password: string, firstName: string, lastName: string) {
		const hashedPassword = await bcrypt.hash(password, 10);
		return this.prisma.user.create({
			data: { email, password: hashedPassword, firstName, lastName },
		});
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } });
	}
}
