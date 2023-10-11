import { NextFunction, Request, Response } from 'express';

import AccountService from '../account-service';
import { Account, AccountSearchParams, CreateAccountParams } from '../types';

export default class AccountController {
  public static async registerAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, username, password }: CreateAccountParams = req.body as CreateAccountParams;
      const params: CreateAccountParams = { name, username, password };
      const account = await AccountService.registerAccount(params);
      res.status(201).send(AccountController.serializeAccountAsJSON(account));
    } catch (e) {
      next(e);
    }
  }

  public static async loginAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password }: AccountSearchParams = req.body as AccountSearchParams;
      const params: AccountSearchParams = {username, password};
      const account = await AccountService.getAccountByUsernamePassword(params);
      res.status(200).send(AccountController.serializeAccountAsJSON(account));
    } catch(e) {
      next(e);
    }
  }

  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      name: account.name,
      username: account.username,
    };
  }
}
