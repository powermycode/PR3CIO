import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { artistId, successUrl, cancelUrl } = await request.json();

    // In a real app, get the user from the session
    // const session = await getServerSession(authOptions);
    // const userId = session?.user?.id;
    const userId = "1"; // Mock userId for now since the auth is mock

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

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create subscription" },
      { status: 500 }
    );
  }
}
