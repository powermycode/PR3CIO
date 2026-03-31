import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { artistId, amount, successUrl, cancelUrl } = await request.json();

    const userId = "1"; // Mock userId

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const artist = await prisma.artistProfile.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
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

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create payment" },
      { status: 500 }
    );
  }
}
