import TransactionsModel from "../models/transaction.js";
import { calcBalance } from "../services/getBalance.js";

export default function TransactionController() {
  const transactionsModel = TransactionsModel();

  const create = async (req, res) => {
    try {
      const { body } = req;
      const transactions = await transactionsModel.getAll(body.accountId);
      const negativeLimit = calcBalance(transactions) + body.amount < 0;
      if (negativeLimit) {
        res.status(400);
        res.send("Não há limite para essa transação");
        return;
      }
      const transaction = await transactionsModel.create(body);
      res.send(transaction);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  const getAll = async (req, res) => {
    try {
      const { id } = req.params;
      const transactions = await transactionsModel.getAll(id);
      res.send(transactions);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  const getBalance = async (req, res) => {
    try {
      const { id } = req.params;
      const transactions = await transactionsModel.getAll(id);
      const balance = calcBalance(transactions);
      res.json({ balance });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  return {
    create,
    getAll,
    getBalance,
  };
}
