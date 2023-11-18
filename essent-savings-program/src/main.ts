import express from 'express';
import cron from 'node-cron';
import accountRoutes from './routes/accountRoutes';
import productRoutes from './routes/productRoutes';
import { accounts, deposits } from './models/accounts';
import interestRoutes from './routes/interestRoutes';
import { interests } from './models/interest';
import AccountController from './controllers/accountControllers';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

app.use('/accounts', accountRoutes);
app.use('/products', productRoutes);
app.use('/interests', interestRoutes);

let currentDay = 1;
// Cron job to process deposits at the end of the day
cron.schedule(
  '0 0 * * *', // every day at 12am
  () => {
    deposits.forEach((deposit, index) => {
      if (currentDay > (deposit.day || 0)) {
        const account = accounts.find((itemAccount) => itemAccount.name === deposit.name);
        if (account) account.balance += deposit.amount;
        deposits.splice(index, 1);
      }
    });
    currentDay += 1;
  },
  {
    scheduled: true,
    timezone: 'Europe/Amsterdam',
  },
);

// Cron job to calculate interest every 30 days
cron.schedule(
  '0 0 */30 * *', // every 30 days
  () => {
    let rate = 0.08; // 8% interest
    const interest = interests.filter((interestItem) => interestItem.day < currentDay);
    if (interest.length > 0) {
      rate = Math.max(...interest.map((interestRate) => interestRate.rate));
    }
    if (currentDay > 0 && (currentDay % 30 === 0)) {
      AccountController.calculateBalanceWithInterest(rate);
    }
    currentDay += 1;
  },
  {
    scheduled: true,
    timezone: 'Europe/Amsterdam',
  },
);

app.listen(port, host, () => {});
export default app;
