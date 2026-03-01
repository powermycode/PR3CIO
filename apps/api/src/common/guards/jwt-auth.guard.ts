import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { getEnv } from "../../config/app.config";
import type { AuthenticatedUser } from "../decorators/current-user.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly env = getEnv();
  private readonly jwks = createRemoteJWKSet(new URL(this.env.SUPABASE_JWT_JWKS_URI));

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string | string[] | undefined>; user?: AuthenticatedUser }>();

    const authHeaderRaw = request.headers.authorization;
    const authHeader = Array.isArray(authHeaderRaw) ? authHeaderRaw[0] : authHeaderRaw;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing Bearer token");
    }

    const token = authHeader.slice("Bearer ".length);

    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.env.SUPABASE_JWT_ISSUER,
        audience: this.env.SUPABASE_JWT_AUDIENCE
      });

      request.user = {
        id: String(payload.sub ?? ""),
        supabaseUserId: String(payload.sub ?? ""),
        email: String(payload.email ?? ""),
        role: (payload.role as AuthenticatedUser["role"]) ?? "LISTENER"
      };

      if (!request.user.supabaseUserId) {
        throw new UnauthorizedException("Token subject missing");
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid authentication token${error instanceof Error ? `: ${error.message}` : ""}`
      );
    }
  }
}
