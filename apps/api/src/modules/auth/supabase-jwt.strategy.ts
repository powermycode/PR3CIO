import { Injectable } from "@nestjs/common";
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
import { getEnv } from "../../config/app.config";

@Injectable()
export class SupabaseJwtStrategy {
  private readonly env = getEnv();
  private readonly jwks = createRemoteJWKSet(new URL(this.env.SUPABASE_JWT_JWKS_URI));

  async verify(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, this.jwks, {
      issuer: this.env.SUPABASE_JWT_ISSUER,
      audience: this.env.SUPABASE_JWT_AUDIENCE
    });

    return payload;
  }
}
