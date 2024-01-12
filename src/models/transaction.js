import { PrismaClient } from "@prisma/client";

export default function TransactionsModel() {
  const prisma = new PrismaClient();
  const transactionHandler = prisma.transaction;

  const create = async (data) => {
    const transaction = await transactionHandler.create({
      data,
    });
    return transaction;
  };

  const getAll = async (id) => {
    const transactions = await transactionHandler.findMany({
      where: {
        accountId: id,
      },
    });
    return transactions;
  };

  return {
    create,
    getAll,
  };
}
