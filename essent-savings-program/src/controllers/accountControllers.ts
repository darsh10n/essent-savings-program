import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  Deposit, accountPurchaseList, accounts, deposits,
} from '../models/accounts';
import { CreateAccountRequestModel, CreateDepositRequestModel, CreatePurchaseRequestModel } from '../schemas/accountsSchemas';
import products from '../products';
import { productHistoryRecords } from '../models/products';

export default class AccountController {
  public static getAccounts(req: Request, res: Response) {
    const simulatedDay = parseInt(req.header('Simulated-Day') || '0', 10);
    res.status(201).json(accounts);
  }

  public static calculateBalanceWithInterest(rate: number) {
    accounts.map((account) => {
      const interest = (30 / 365) * rate * account.balance;
      account.balance += interest;
    });
    return accounts;
  }

  public static getAccountById(req: Request, res: Response) {
    const accountById = accounts.find((accountItem) => accountItem.id === req.params.accountId);
    if (accountById) { res.status(200).json(accountById); } else { res.sendStatus(404); }
  }

  public static async createAccount(req: Request, res: Response) {
    try {
      const newAccount = new CreateAccountRequestModel(req.body);
      await newAccount.validate();

      const addAccount = {
        id: uuidv4(),
        name: newAccount.name,
        balance: 20000,
      };
      accounts.push(addAccount);
      return res.status(200).json(addAccount);
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  public static async registerDeposit(req: Request, res: Response) {
    try {
      const newDeposit = new CreateDepositRequestModel(req.body);
      await newDeposit.validate();
      const simulatedDay = parseInt(req.header('Simulated-Day') || '0', 10);
      const account = accounts.find((accountItem) => accountItem.id === req.params.accountId);

      if (account) {
        const addDeposit: Deposit = {
          id: uuidv4(),
          name: account.name,
          amount: newDeposit.amount,
          day: simulatedDay,
        };
        deposits.push(addDeposit);
        return res.status(200).json({
          id: addDeposit.id,
          name: account.name,
          balance: account.balance,
        });
      }
      return res.status(404).json({ message: 'Account id not found to deposit' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  public static async registerProductPurchase(req: Request, res: Response) {
    try {
      const simulatedDay = parseInt(req.header('Simulated-Day') || '0', 10);
      const newpurchase = new CreatePurchaseRequestModel(req.body);
      await newpurchase.validate();
      const { accountId } = req.params;
      const { productId } = req.body;

      const productAvailabilityDay = productHistoryRecords.length -1; //latest product available day
      const product = productHistoryRecords[productAvailabilityDay].find((item) => item.id === productId);
      const account = accounts.find((accountFind) => accountFind.id === accountId);
      const accountPurchaseRecord = accountPurchaseList.filter(
        (accPurchaseItem) => accPurchaseItem.accountId === accountId,
      );

      if (account && product) {
        if (accountPurchaseRecord.length > 0 && (simulatedDay
          < (Math.max(...accountPurchaseList.map((purchase) => purchase.purchaseDay) || 0)))) {
          return res.sendStatus(400);
        } // Simulated day illegal

        if (account.balance >= product.price && product.stock > 0) {
          account.balance -= product.price;
          product.stock -= 1;
          accounts.map((item) => ((item.id === account.id) ? account : item));
          productHistoryRecords[productAvailabilityDay].map((productItem) => ((productItem.id === product.id) ? product : productItem));
          accountPurchaseList.push({ accountId, purchaseDay: simulatedDay });

          return res.sendStatus(201); // success
        } return res.sendStatus(409); // not enough stock or funds
      } return res.status(404).json({ message: 'Account or Product not found to purchase' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
