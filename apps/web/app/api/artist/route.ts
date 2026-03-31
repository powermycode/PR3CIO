import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get("artistId");
    const slug = searchParams.get("slug");

    let artistProfile;

    if (artistId) {
      artistProfile = await prisma.artistProfile.findUnique({
        where: { id: artistId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          tracks: {
            orderBy: { createdAt: "desc" },
          },
        },
      });
    } else if (slug) {
      artistProfile = await prisma.artistProfile.findFirst({
        where: {
          OR: [{ stageName: { contains: slug } }],
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          tracks: {
            orderBy: { createdAt: "desc" },
          },
        },
      });
    } else {
      const artistProfiles = await prisma.artistProfile.findMany({
        take: 10,
        orderBy: { monthlyListeners: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: { tracks: true },
          },
        },
      });
      return NextResponse.json({ artists: artistProfiles });
    }

    if (!artistProfile) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    return NextResponse.json({ artist: artistProfile });
  } catch (error) {
    console.error("Error fetching artist:", error);
    return NextResponse.json(
      { error: "Failed to fetch artist" },
      { status: 500 },
    );
  }
}
