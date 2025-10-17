import { PrismaClient } from "@prisma/client";
import password from "./password.js";

const prisma = new PrismaClient();

async function create(userInputValues) {
  const hashedPassword = await password.hash(userInputValues.password);

  await findByEmail(userInputValues);

  const newUser = await prisma.user.create({
    data: {
      name: userInputValues.name,
      email: userInputValues.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return newUser;
}

async function findByEmail(userInputValues) {
  const userEmailExists = await prisma.user.findUnique({
    where: { email: userInputValues.email },
  });

  if (userEmailExists) {
    throw new Error("Email já cadastrado.");
  }
}

async function findByEmailOrThrow(userInputValues) {
  const userFound = await prisma.user.findUnique({
    where: { email: userInputValues.email },
  });

  if (!userFound) {
    throw new Error("Usuário não encontrado.");
  }

  return userFound;
}

const user = {
  create,
  findByEmail,
  findByEmailOrThrow,
};

export default user;
