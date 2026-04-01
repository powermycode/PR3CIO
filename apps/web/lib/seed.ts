import prisma from "./prisma";

async function main() {
  console.log("Seeding database...");

  // Clear existing data to ensure a clean state
  await prisma.track.deleteMany({});
  await prisma.artistProfile.deleteMany({});
  await prisma.user.deleteMany({});

  const user1 = await prisma.user.create({
    data: {
      email: "rico@pr3cio.com",
      name: "Rico Milano",
      role: "ARTIST",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "artizz@pr3cio.com",
      name: "Artizz",
      role: "ARTIST",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "lesj@pr3cio.com",
      name: "Lesj",
      role: "ARTIST",
    },
  });

  const artist1 = await prisma.artistProfile.create({
    data: {
      userId: user1.id,
      stageName: "Rico Milano",
      bio: "Rising force in the Hip Hop scene, known for unique blend of lyrical depth and modern production.",
    },
  });

  const artist2 = await prisma.artistProfile.create({
    data: {
      userId: user2.id,
      stageName: "Artizz",
      bio: "Fresh perspective to Hip Hop with complex flows and storytelling that resonates globally.",
    },
  });

  const artist3 = await prisma.artistProfile.create({
    data: {
      userId: user3.id,
      stageName: "Lesj",
      bio: "Redefining the sound of modern Hip Hop with infectious energy and innovative beats.",
    },
  });

  console.log(`Created artists with IDs: ${artist1.id}, ${artist2.id}, ${artist3.id}`);

  await prisma.track.createMany({
    data: [
      {
        title: "Edo Soul",
        artistId: artist1.id,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        coverArt: "/artists/RicoMilanoPr3cio.png",
        genre: "Hip Hop",
      },
      {
        title: "Artizz Flow",
        artistId: artist2.id,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        coverArt: "/artists/ArtizzPr3cio.png",
        genre: "Hip Hop",
      },
      {
        title: "Lesj Vibe",
        artistId: artist3.id,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        coverArt: "/artists/LesjPr3cio.png",
        genre: "Hip Hop",
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
