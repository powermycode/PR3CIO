import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const { userId, artistId, type } = session.metadata;

        if (type === "SUBSCRIPTION") {
          await prisma.subscription.create({
            data: {
              userId,
              artistId,
              stripeSubId: session.subscription,
              status: "ACTIVE",
            },
          });
          // Update user to be a supporter
          await prisma.user.update({
            where: { id: userId },
            data: { isSupporter: true },
          });
        } else if (type === "TIP") {
          await prisma.payment.create({
            data: {
              userId,
              artistId,
              amount: session.amount_total,
              type: "TIP",
              stripePaymentIntentId: session.payment_intent,
            },
          });
          // Also mark as supporter for tips
          await prisma.user.update({
            where: { id: userId },
            data: { isSupporter: true },
          });
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        if (invoice.subscription) {
          await prisma.subscription.updateMany({
            where: { stripeSubId: invoice.subscription },
            data: { status: "UNPAID" },
          });
          // Optionally remove supporter status if no other active subs/tips
          // For now, keep it simple
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
