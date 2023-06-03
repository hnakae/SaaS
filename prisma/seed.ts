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
      title: "proverbs",
      description: "fundamental concepts",
      content: "strength & weakness of groups",
    },
    // Add more course data here
    {
      title: "basic instinct",
      description: "description2",
      content: "content2",
    },
    {
      title: "joseki",
      description: "description3",
      content: "content3",
    },
    {
      title: "alpha go",
      description: "description3",
      content: "content3",
    },
    {
      title: "strategies",
      description: "description3",
      content: "content3",
    },
    {
      title: "tenuki",
      description: "description3",
      content: "content3",
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
