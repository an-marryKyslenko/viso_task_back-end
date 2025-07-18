import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { NewUser } from "./auth.type";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { generateTokens } from "./local.strategy";
import { Public } from "src/constants";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UsersService, 
		private jwtService: JwtService
	) {}

	@Public()
	@Post('register')
	async register(@Res({passthrough: true}) res: Response, @Body() body: NewUser) {
		const {accessToken, refreshToken, user} = await this.authService.register(body);

		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		res.cookie('access_token', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 15 * 60 * 1000,
		});
		
		return {user};
	}

	@Public()
	@Post('login')
	async login(@Res({passthrough: true}) res: Response, @Body() body: {email: string, password: string}) {
		const {accessToken, refreshToken, user} = await this.authService.login(body);

		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		res.cookie('access_token', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 15 * 60 * 1000,
		});
		return {user};
	}

	@Public()
	@Post('refresh')
	async refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
		const refreshToken = req.cookies['refresh_token'];

		try {
			const payload = await this.jwtService.verifyAsync(refreshToken);
			const user = await this.userService.findByEmail(payload.email);

			if (!user) throw new NotFoundException();

			const {accessToken} = await generateTokens(user, this.jwtService)
			
			res.cookie('access_token', accessToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
				maxAge: 15 * 60 * 1000,
			});

			return { message: 'refreshed'};
		} catch {
			throw new UnauthorizedException();
		}
	}

	@UseGuards(AuthGuard)
	@Get('whoami')
	getMe(@Req() req: Request) {
	return { user: req['user'] ?? null };
	}

	@Get('debug-cookies')
	@Public()
	debug(@Req() req: Request) {
	return { cookies: req.cookies };
	}


	@HttpCode(HttpStatus.OK)
	@Post('logout')
	@Public()
	async logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('refresh_token', {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});
		
		res.clearCookie('access_token', {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});

		return { message: 'Logged out successfully' };
	}


}
