import prisma from "./prisma";

async function main() {
  console.log("Seeding database...");

  const existingArtists = await prisma.artistProfile.findMany();
  if (existingArtists.length > 0) {
    console.log("Database already has artists, skipping seed.");
    return;
  }

  const user1 = await prisma.user.upsert({
    where: { email: "rico@pr3cio.com" },
    update: {},
    create: {
      id: "user_rico",
      email: "rico@pr3cio.com",
      name: "Rico Milano",
      role: "ARTIST",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "artizz@pr3cio.com" },
    update: {},
    create: {
      id: "user_artizz",
      email: "artizz@pr3cio.com",
      name: "Artizz",
      role: "ARTIST",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "lesj@pr3cio.com" },
    update: {},
    create: {
      id: "user_lesj",
      email: "lesj@pr3cio.com",
      name: "Lesj",
      role: "ARTIST",
    },
  });

  const artist1 = await prisma.artistProfile.create({
    data: {
      id: "artist_rico",
      userId: user1.id,
      stageName: "Rico Milano",
      bio: "Rising force in the Hip Hop scene, known for unique blend of lyrical depth and modern production.",
      genres: "Hip Hop,Trap,Drill",
      monthlyListeners: 283000,
    },
  });

  const artist2 = await prisma.artistProfile.create({
    data: {
      id: "artist_artizz",
      userId: user2.id,
      stageName: "Artizz",
      bio: "Fresh perspective to Hip Hop with complex flows and storytelling that resonates globally.",
      genres: "Hip Hop,R&B",
      monthlyListeners: 413000,
    },
  });

  const artist3 = await prisma.artistProfile.create({
    data: {
      id: "artist_lesj",
      userId: user3.id,
      stageName: "Lesj",
      bio: "Redefining the sound of modern Hip Hop with infectious energy and innovative beats.",
      genres: "Hip Hop,Trap",
      monthlyListeners: 269000,
    },
  });

  await prisma.track.createMany({
    data: [
      {
        title: "Edo Soul",
        artistId: artist1.id,
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        coverArt: "/artists/RicoMilanoPr3cio.png",
        genre: "Hip Hop",
        playCount: 125000,
        likes: 8400,
      },
      {
        title: "Artizz Flow",
        artistId: artist2.id,
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        coverArt: "/artists/ArtizzPr3cio.png",
        genre: "Hip Hop",
        playCount: 198000,
        likes: 15200,
      },
      {
        title: "Lesj Vibe",
        artistId: artist3.id,
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        coverArt: "/artists/LesjPr3cio.png",
        genre: "Hip Hop",
        playCount: 145000,
        likes: 9800,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
