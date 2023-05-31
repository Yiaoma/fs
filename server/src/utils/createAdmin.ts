import { z } from "zod";
import argon2 from "argon2";
import { prisma } from "../db/prisma";
import { usernameRegex, passwordRegex } from "../constants/regex";

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.error("Invalid credentials");
  process.exit(1);
}

(async () => {
  const validUsername = z
    .string()
    .trim()
    .regex(usernameRegex)
    .safeParse(username);
  if (!validUsername.success) {
    console.error("Invalid username");
    process.exit(1);
  }

  const validPassword = z
    .string()
    .trim()
    .regex(passwordRegex)
    .safeParse(password);
  if (!validPassword.success) {
    console.error("Invalid password");
    process.exit(1);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: validUsername.data },
    });
    if (user) {
      console.error("User already exists");
      process.exit(1);
    }
    const hashedPassword = await argon2.hash(validPassword.data);
    await prisma.user.create({
      data: {
        username: validUsername.data,
        passwordHash: hashedPassword,
      },
    });

    console.log("Admin user created");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
