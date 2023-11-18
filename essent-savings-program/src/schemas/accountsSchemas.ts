import mongoose, { Model, Schema } from 'mongoose';
import {
  CreateAccountRequest, Account, Deposit, CreateDepositRequest, CreatePurchaseRequest,
} from '../models/accounts';

const CreateAccountRequestSchema: Schema<CreateAccountRequest> = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
});

const AccountSchema: Schema<Account> = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  id: {
    type: String,
    minLength: 36,
    maxLength: 36,
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const DepositSchema: Schema<Deposit> = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  id: {
    type: String,
    minLength: 36,
    maxLength: 36,
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const CreateDepositRequestSchema: Schema<CreateDepositRequest> = new mongoose.Schema({
  amount: {
    type: Number,
    min: 1,
    max: 15000,
    required: true,
  },
});

const CreatePurchaseRequestSchema: Schema<CreatePurchaseRequest> = new mongoose.Schema({
  productId: {
    type: String,
    minLength: 5,
    maxLength: 15,
    required: true,
  },
});

const AccountModel: Model<Account> = mongoose.model('account', AccountSchema);
const CreateAccountRequestModel: Model<CreateAccountRequest> = mongoose.model('accountRequest', CreateAccountRequestSchema);
const CreateDepositRequestModel: Model<CreateDepositRequest> = mongoose.model('depositRequest', CreateDepositRequestSchema);
const CreatePurchaseRequestModel: Model<CreatePurchaseRequest> = mongoose.model('purchaseRequest', CreatePurchaseRequestSchema);

export {
  CreateAccountRequestSchema, AccountSchema, DepositSchema, CreateDepositRequestSchema,
  CreatePurchaseRequestSchema, AccountModel, CreateAccountRequestModel, CreateDepositRequestModel,
  CreatePurchaseRequestModel,
};
