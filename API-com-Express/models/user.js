import { PrismaClient } from "@prisma/client";
import password from "./password.js";

const prisma = new PrismaClient();

async function create(userImputValues) {
  const hashedPassword = await password.hash(userImputValues.password);

  if (await findUserByEmail(userImputValues)) {
    throw new Error("Email já cadastrado.");
  }

  const newUser = await prisma.user.create({
    data: {
      name: userImputValues.name,
      email: userImputValues.email,
      password: hashedPassword,
    },
  });

  return newUser;
}

async function findUserByEmail(userImputValues) {
  return await prisma.user.findUnique({
    where: { email: userImputValues.email },
  });
}

const user = {
  create,
  findUserByEmail,
};

export default user;
