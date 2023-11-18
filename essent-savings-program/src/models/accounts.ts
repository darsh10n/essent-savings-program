/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
interface CreateAccountRequest {
  name: string;
}

interface Account {
  id: string;
  name: string;
  balance: number;
}

interface Deposit {
  id: string;
  name: string;
  amount: number;
  day: number;
}

interface AccountPurchaseList {
  accountId: string;
  purchaseDay: number;
}

interface CreateDepositRequest {
  amount: number;
}

interface CreatePurchaseRequest {
  productId: string;
}

type CreateAccountsResponse = Account;
type GetAccountsResponse = Account[];

export let accounts: Account[] = [];
export let deposits: Deposit[] = [];
export let accountPurchaseList: AccountPurchaseList[] = [];

export {
  CreateAccountRequest, Account, Deposit, CreateAccountsResponse, GetAccountsResponse,
  CreateDepositRequest, CreatePurchaseRequest,
};
