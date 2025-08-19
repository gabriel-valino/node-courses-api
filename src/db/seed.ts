import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";
import { fakerPT_BR as faker } from '@faker-js/faker'
import { hash } from 'argon2'

async function seed() {
  const passwordHash = await hash('123456');

  const usersInsert = await db.insert(users).values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      role: "student",
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      role: "student",
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: passwordHash,
      role: "student",
    },
  ]).returning()

  const coursesInsert = await db.insert(courses).values([
    { title: faker.lorem.words(3), description: faker.lorem.sentence() },
    { title: faker.lorem.words(3), description: faker.lorem.sentence() },
  ]).returning()

  await db.insert(enrollments).values([
    { courseId: coursesInsert[0]!.id, userId: usersInsert[0]!.id },
    { courseId: coursesInsert[0]!.id, userId: usersInsert[1]!.id },
    { courseId: coursesInsert[1]!.id, userId: usersInsert[2]!.id },
  ])
}

seed().then(() => {
  console.log("Seed concluído!");
  process.exit(0);
}).catch((err) => {
  console.error("Erro ao executar seed:", err);
  process.exit(1);
})