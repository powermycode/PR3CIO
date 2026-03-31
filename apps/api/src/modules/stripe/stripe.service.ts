import { Injectable, OnModuleInit } from "@nestjs/common";
import Stripe from "stripe";
import { getEnv } from "../../config/app.config";
import { PrismaService } from "../../infra/prisma.service";

@Injectable()
export class StripeService implements OnModuleInit {
  private stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    const env = getEnv();
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-01-27-acacia" as any,
    });
  }

  async getOrCreateCustomer(userId: string, email: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    if (user?.stripeCustomerId) {
      return user.stripeCustomerId;
    }

    const customer = await this.stripe.customers.create({
      email,
      metadata: { userId },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id },
    });

    return customer.id;
  }

  async createSubscriptionSession(userId: string, artistId: string, successUrl: string, cancelUrl: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, stripeCustomerId: true },
    });

    if (!user) throw new Error("User not found");

    const customerId = await this.getOrCreateCustomer(userId, user.email);

    const artist = await this.prisma.artistProfile.findUnique({
      where: { id: artistId },
    });

    if (!artist) throw new Error("Artist not found");

    // Create a product for the artist membership if it doesn't exist
    // For simplicity, we can use a generic "Artist Subscription" or create one per artist
    // Here we create/get a product for this specific artist
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Support ${artist.stageName}`,
              description: `Monthly subscription to support ${artist.stageName}`,
            },
            unit_amount: 500, // $5.00
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        artistId,
        type: "SUBSCRIPTION",
      },
    });

    return { url: session.url };
  }

  async createPaymentSession(userId: string, artistId: string, amount: number, successUrl: string, cancelUrl: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, stripeCustomerId: true },
    });

    if (!user) throw new Error("User not found");

    const customerId = await this.getOrCreateCustomer(userId, user.email);

    const artist = await this.prisma.artistProfile.findUnique({
      where: { id: artistId },
    });

    if (!artist) throw new Error("Artist not found");

    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Tip for ${artist.stageName}`,
              description: `One-time support for ${artist.stageName}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        artistId,
        type: "TIP",
      },
    });

    return { url: session.url };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const env = getEnv();
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, artistId, type } = session.metadata;

        if (type === "SUBSCRIPTION") {
          await this.prisma.subscription.create({
            data: {
              userId,
              artistId,
              stripeSubId: session.subscription as string,
              status: "ACTIVE",
            },
          });
          await this.prisma.user.update({
            where: { id: userId },
            data: { isSupporter: true },
          });
        } else if (type === "TIP") {
          await this.prisma.payment.create({
            data: {
              userId,
              artistId,
              amount: session.amount_total,
              type: "TIP",
              stripePaymentIntentId: session.payment_intent as string,
            },
          });
          await this.prisma.user.update({
            where: { id: userId },
            data: { isSupporter: true },
          });
        }
        break;
      }
      case "payment_intent.succeeded": {
        // Handle standalone payment intent success if not using Checkout
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await this.prisma.subscription.updateMany({
            where: { stripeSubId: invoice.subscription as string },
            data: { status: "UNPAID" },
          });
        }
        break;
      }
    }

    return { received: true };
  }
}
