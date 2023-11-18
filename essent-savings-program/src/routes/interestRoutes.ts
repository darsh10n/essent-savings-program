import { Router } from 'express';
import InterestController from '../controllers/interestControllers';

const router = Router();

router.post('/', InterestController.createInterest);

export default router;
