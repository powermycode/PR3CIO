import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, audioUrl, artistId, coverUrl, genre, description } = body;

    if (!title || !audioUrl || !artistId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, audioUrl, artistId",
        },
        { status: 400 },
      );
    }

    const artistProfile = await prisma.artistProfile.findUnique({
      where: { id: artistId },
    });

    if (!artistProfile) {
      return NextResponse.json(
        { success: false, error: "Artist profile not found" },
        { status: 404 },
      );
    }

    const track = await prisma.track.create({
      data: {
        title,
        audioUrl,
        artistId,
        coverArt: coverUrl || null,
        genre: genre || null,
        description: description || null,
      },
      include: {
        artist: {
          select: {
            id: true,
            stageName: true,
            avatar: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, track }, { status: 201 });
  } catch (error) {
    console.error("[/api/track] Error creating track:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create track",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get("artistId");

    const where = artistId ? { artistId } : {};

    const tracks = await prisma.track.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        artist: {
          select: {
            id: true,
            stageName: true,
            avatar: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("[/api/track] Error fetching tracks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tracks" },
      { status: 500 },
    );
  }
}
