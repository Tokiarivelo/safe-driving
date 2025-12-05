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

async function main() {
  await seedRoles();
  await seedReviews();
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
