const { z } = require("zod");
const argon2 = require("argon2");
const { PrismaClient } = require("@prisma/client");

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.error("Invalid credentials");
  process.exit(1);
}

(async () => {
  const validUsername = z
    .string()
    .regex(/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
    .safeParse(username.trim());
  if (!validUsername.success) {
    console.error("Invalid username");
    process.exit(1);
  }

  const validPassword = z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .safeParse(password.trim());
  if (!validPassword.success) {
    console.error("Invalid password");
    process.exit(1);
  }

  const prisma = new PrismaClient();

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
