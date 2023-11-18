import { Router } from 'express';
import AccountController from '../controllers/accountControllers';

const router = Router();

router.get('/', AccountController.getAccounts);
router.get('/:accountId', AccountController.getAccountById);
router.post('/', AccountController.createAccount);
router.post('/:accountId/deposits', AccountController.registerDeposit);
router.post('/:accountId/purchases', AccountController.registerProductPurchase);

export default router;
