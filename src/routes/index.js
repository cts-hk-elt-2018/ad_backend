import express from 'express';
import pageRouter from './page.route';
import authRouter from './auth.route';
import checkinRouter from './checkin.route';
import luckyDrawRouter from './luckydraw.route'; 
 
const router = express.Router();

router.use('/api/page', pageRouter);
router.use('/api/auth', authRouter);
router.use('/api/checkin', checkinRouter);
router.use('/api/luckydraw', luckyDrawRouter);
 
export default router;
