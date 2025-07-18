import { JwtService } from "@nestjs/jwt";
import { normalizedUser } from "./auth.service";
import { User } from "./auth.type";

export async function generateTokens(user: User, jwtService: JwtService) {
	const payload = { ...(normalizedUser(user))};

	const accessToken = jwtService.sign(payload, { expiresIn: '2m' });
	const refreshToken = jwtService.sign({ email: user.email }, { expiresIn: '7d' });

	return { accessToken, refreshToken, user: {...payload}};
}