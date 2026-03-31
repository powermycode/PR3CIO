import {
  Body,
  Controller,
  Post,
  Req,
  Headers,
  RawBodyRequest,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post("create-subscription")
  @UseGuards(JwtAuthGuard)
  async createSubscription(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { artistId: string; successUrl: string; cancelUrl: string }
  ) {
    return this.stripeService.createSubscriptionSession(
      user.supabaseUserId,
      body.artistId,
      body.successUrl,
      body.cancelUrl
    );
  }

  @Post("create-payment")
  @UseGuards(JwtAuthGuard)
  async createPayment(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { artistId: string; amount: number; successUrl: string; cancelUrl: string }
  ) {
    return this.stripeService.createPaymentSession(
      user.supabaseUserId,
      body.artistId,
      body.amount,
      body.successUrl,
      body.cancelUrl
    );
  }

  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers("stripe-signature") signature: string,
    @Req() req: RawBodyRequest<Request>
  ) {
    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }
    return this.stripeService.handleWebhook(signature, req.rawBody);
  }
}
