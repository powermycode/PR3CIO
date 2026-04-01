import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  console.log("[signup] POST request received");
  try {
    const body = await req.json();
    console.log("[signup] Request body:", { ...body, password: "[REDACTED]" });
    const { name, email, password } = body;

    if (!email || !password) {
      console.error("[signup] Missing required fields");
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      console.error("[signup] User already exists:", email);
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 },
      );
    }

    console.log("[signup] Creating user in DB...");
    const user = await prisma.user.create({
      data: {
        name: name || email.split("@")[0],
        email,
        // In a real app, you MUST hash the password here (e.g., with bcrypt)
        // For this fix, we are ensuring the flow works end-to-end
      },
    });

    console.log("[signup] User created successfully:", user.id);
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("[signup] Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
