import { PrismaClient } from '@prisma/client';
import { RoleEnum } from 'src/dtos/enums/role.enum';

const prisma = new PrismaClient();

// Mock data for reviews
const mockReviews = [
  {
    content: "Chauffeur très professionnel, la voiture était propre et le trajet s'est très bien passé. Je recommande à 100%!",
    rating: 5,
  },
  {
    content: "Très sympathique et ponctuel. Juste un petit détour non prévu, mais rien de grave. Bonne expérience.",
    rating: 5,
  },
  {
    content: "Course efficace. J'aurais juste aimé un peu plus de discussion, mais ça dépend des gens 😊.",
    rating: 4,
  },
  {
    content: "Le trajet était correct mais le chauffeur a mis un peu de temps à arriver. Sinon très poli.",
    rating: 3,
  },
  {
    content: "Excellent service ! Le chauffeur connaissait très bien la ville et m'a même recommandé un bon restaurant.",
    rating: 5,
  },
  {
    content: "Bonne expérience globale. Voiture confortable et propre. Je referai appel à ce service.",
    rating: 4,
  },
  {
    content: "Trajet agréable, chauffeur courtois. La climatisation fonctionnait parfaitement malgré la chaleur.",
    rating: 5,
  },
  {
    content: "Service correct. Le chauffeur était un peu en retard mais s'est excusé poliment.",
    rating: 3,
  },
];

// Mock reviewer names
const mockReviewers = [
  { firstName: 'Hanta', lastName: 'Rakotondrabe' },
  { firstName: 'Mamy', lastName: 'Toavina' },
  { firstName: 'Zo', lastName: 'Rakoto' },
  { firstName: 'Liana', lastName: 'Vololoniaina' },
  { firstName: 'Fidy', lastName: 'Andriantsoa' },
  { firstName: 'Noro', lastName: 'Razafindrabe' },
  { firstName: 'Tiana', lastName: 'Ratsimba' },
  { firstName: 'Hery', lastName: 'Andriamanalina' },
];

async function seedRoles() {
  for (const roleName of Object.values(RoleEnum)) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
      },
    });
  }
  console.log('✅ Roles seeded.');
}

async function seedReviews() {
  // Get all users to create reviews for
  const users = await prisma.user.findMany({
    take: 10,
  });

  if (users.length === 0) {
    console.log('⚠️ No users found. Skipping review seeding.');
    return;
  }

  console.log(`📝 Creating reviews for ${users.length} users...`);

  for (const user of users) {
    // Check if user already has reviews
    const existingReviews = await prisma.review.count({
      where: { userId: user.id },
    });

    if (existingReviews > 0) {
      console.log(`  - User ${user.firstName} already has reviews, skipping.`);
      continue;
    }

    // Create 2-4 random reviews for each user
    const numReviews = Math.floor(Math.random() * 3) + 2; // 2-4 reviews
    
    for (let i = 0; i < numReviews; i++) {
      const reviewData = mockReviews[Math.floor(Math.random() * mockReviews.length)];
      const reviewer = mockReviewers[Math.floor(Math.random() * mockReviewers.length)];
      
      // Create a random date within the last year
      const randomDays = Math.floor(Math.random() * 365);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - randomDays);

      await prisma.review.create({
        data: {
          userId: user.id,
          content: reviewData.content,
          rating: reviewData.rating,
          createdAt: createdAt,
        },
      });
    }
    console.log(`  ✓ Created ${numReviews} reviews for ${user.firstName}`);
  }

  console.log('✅ Reviews seeded.');
}

async function seedStatistics() {
  console.log('📊 Seeding statistics...');

  // Get all users
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      Role: true,
    },
  });

  if (allUsers.length === 0) {
    console.log('⚠️ No users found. Skipping statistics seeding.');
    return;
  }

  // Separate drivers and regular users (drivers have roles, but for simplicity we'll use all users)
  const drivers = allUsers.slice(0, Math.min(20, Math.floor(allUsers.length / 2)));
  const users = allUsers.slice(drivers.length);

  console.log(`📊 Creating statistics for ${drivers.length} drivers...`);

  // Seed driver statistics
  for (const driver of drivers) {
    // Check if statistics already exist
    const existingStats = await prisma.rideStatistic.findFirst({
      where: { driverId: driver.id },
    });

    if (existingStats) {
      console.log(`  - Driver ${driver.firstName} already has statistics, skipping.`);
      continue;
    }

    // Generate random statistics
    const completedRides = Math.floor(Math.random() * 290) + 10; // 10-300
    const revenue = Math.floor(Math.random() * 900000) + 100000; // 100,000-1,000,000 MGA
    const averageRating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0-5.0
    const totalReviews = Math.floor(Math.random() * 16) + 5; // 5-20
    const motivationScore = Math.floor(Math.random() * 60) + 40; // 40-100

    await prisma.rideStatistic.create({
      data: {
        driverId: driver.id,
        completedRides,
        revenue,
        averageRating,
        totalReviews,
        motivationScore,
      },
    });

    console.log(
      `  ✓ Created statistics for driver ${driver.firstName}: ${completedRides} rides, ${revenue} MGA, ${averageRating}⭐`,
    );
  }

  console.log(`📊 Creating statistics for ${Math.min(50, users.length)} users...`);

  // Seed user statistics
  const usersToSeed = users.slice(0, Math.min(50, users.length));
  for (const user of usersToSeed) {
    // Check if statistics already exist
    const existingStats = await prisma.rideStatistic.findFirst({
      where: { userId: user.id },
    });

    if (existingStats) {
      console.log(`  - User ${user.firstName} already has statistics, skipping.`);
      continue;
    }

    // Generate random statistics for users
    const completedRides = Math.floor(Math.random() * 40) + 1; // 1-40
    const averageRating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0-5.0
    const totalReviews = Math.floor(Math.random() * 10) + 1; // 1-10
    const motivationScore = Math.floor(Math.random() * 70) + 20; // 20-90

    await prisma.rideStatistic.create({
      data: {
        userId: user.id,
        completedRides,
        revenue: 0, // Users don't have revenue
        averageRating,
        totalReviews,
        motivationScore,
      },
    });

    console.log(
      `  ✓ Created statistics for user ${user.firstName}: ${completedRides} rides, ${averageRating}⭐`,
    );
  }

  console.log('✅ Statistics seeded.');
}

async function main() {
  await seedRoles();
  await seedReviews();
  await seedStatistics();
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
