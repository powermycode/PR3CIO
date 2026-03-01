import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { UserRole } from "@pr3cio/types";

export interface AuthenticatedUser {
  id: string;
  supabaseUserId: string;
  email: string;
  role: UserRole;
}

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
  return request.user;
});
