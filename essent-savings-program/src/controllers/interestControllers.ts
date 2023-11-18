import { Request, Response } from 'express';
import { CreateInterestRequestModel } from '../schemas/interestsSchemas';
import { Interest, interests } from '../models/interest';

export default class InterestController {
  public static async createInterest(req: Request, res: Response) {
    try {
      const simulatedDay = parseInt(req.header('Simulated-Day') || '0', 10);
      const { rate } = req.body;
      const newInterest = new CreateInterestRequestModel(req.body);
      await newInterest.validate();

      const addInterest: Interest = {
        rate,
        day: simulatedDay,
      };
      interests.push(addInterest);
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(400);
    }
  }
}
