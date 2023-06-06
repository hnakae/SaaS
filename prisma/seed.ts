import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const password = await hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@test.io" },
    update: {},
    create: {
      email: "test@test.io",
      name: "Test User",
      password,
    },
  });
  console.log({ user });

  // Seed the course table
  const courseData = [
    {
      title: "basic instinct",
      description: "local shapes",
      content: "Must Know",
      image: "shape.png",
    },
    {
      title: "alpha go",
      description: "Systematic Opening",
      content: "Alpha Go Zero Style",
      image: "alphago.png",
    },
    {
      title: "proverbs",
      description: "fundamental concepts",
      content: "strength & weakness of groups",
      image: "proverbs.png",
    },
    {
      title: "joseki",
      description: "Joseki Series",
      content: "will be updated frequently",
      image: "joseki.png",
    },
    {
      title: "strategy",
      description: "Shin Jinseo",
      content: "Let's study how Shin Jinseo plays",
      image: "strategy.png",
    },
  ];

  for (const data of courseData) {
    const course = await prisma.course.upsert({
      where: { title: data.title },
      update: {},
      create: data,
    });
    console.log("Course seeded:", course);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
