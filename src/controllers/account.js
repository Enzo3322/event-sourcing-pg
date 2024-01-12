import AccountModel from "../models/account.js";

export default function AccountController() {
  const accountModel = AccountModel();
  const create = async (req, res) => {
    try {
      const { name } = req.body;
      const account = await accountModel.create({ name });
      res.json(account);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  return {
    create,
  };
}
