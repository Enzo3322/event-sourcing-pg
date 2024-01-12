import express from "express";
import TransactionController from "./controllers/transaction.js";
import AccountController from "./controllers/account.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const transactionController = TransactionController();
const accountController = AccountController();

app.post("/api/v1/account", accountController.create);
app.get("/api/v1/transactions/:id", transactionController.getAll);
app.post("/api/v1/transactions", transactionController.create);
app.get("/api/v1/transactions/amount/:id", transactionController.getBalance);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
