import { PrismaClient } from '@prisma/client';
import * as seedData from './seeds/article-seed.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.article.deleteMany({});

  for (const article of seedData) {
    const tags = [article.tag1, article.tag2, article.tag3].filter(Boolean);

    await prisma.article.create({
      data: {
        title: article.title,
        content: article.content,
        author: article.author,
        tags: tags,
      },
    });
  }

  console.log('Database seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });