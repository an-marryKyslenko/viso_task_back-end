import { 
	CanActivate, 
	ExecutionContext, 
	Injectable, 
	UnauthorizedException 
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY, jwtConstants } from "../constants";
import { Request } from "express";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
		]);
		if (isPublic) {
		// 💡 See this condition
		return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = this.extractToken(request);

		if (!token) {
			throw new UnauthorizedException('No access token provided');
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: jwtConstants.secret,
			});

			request['user'] = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true
	}

	private extractToken(request: Request): string | undefined {
		const cookieToken = request.cookies?.['access_token'];
		
		if(cookieToken) return cookieToken;
		
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}