import { Request, Response } from 'express';
import AccountController from './accountControllers';

describe('AccountController', () => {
  describe('createAccount', () => {
    it('should create a new account successfully', async () => {
      const newAccountData = {
        name: 'Darshan',
      };

      const req = {
        body: newAccountData,
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn(),
      } as unknown as Response;

      await AccountController.createAccount(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(newAccountData));
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ balance: 0 }));
    });
  });

  it('should return 400 for invalid data', async () => {
    const newAccountData = {};

    const req = {
      body: newAccountData,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;

    await AccountController.createAccount(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });

  describe('getAccounts', () => {
    it('should get all accounts successfully', () => {
      const simulatedDay = '0';
      const req = {
        header: jest.fn().mockReturnValue(simulatedDay),
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        header: jest.fn(() => '0'),
      } as unknown as Response;

      AccountController.getAccounts(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('getAccountById', () => {
    it('should get an account by account ID', () => {
      const accountId = 'a5e247fc-c8cd-4973-aeab-4c5b2789e01d';
      const req = {
        params: {
          accountId,
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn(),
      } as unknown as Response;

      // AccountController.accounts = [
      // // let accounts = [
      //   {
      //     id: 'a5e247fc-c8cd-4973-aeab-4c5b2789e01d',
      //     name: 'Darshan',
      //     balance: 0,
      //   },
      // ];

      AccountController.getAccountById(req, res);

      // expect(res.status).toHaveBeenCalledWith(200);
      // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: accountId }));
    });
  });
});
