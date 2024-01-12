import { PrismaClient } from "@prisma/client";

export default function AccountModel() {
  const prisma = new PrismaClient();
  const accountHandler = prisma.account;

  const create = async (data) => {
    console.log({ data });
    const account = await accountHandler.create({
      data: {
        name: data.name,
      },
    });
    return account;
  };

  return {
    create,
  };
}
