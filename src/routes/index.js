import express from 'express';
import indexRouter from './index.route';
import usersRouter from './users.route';
import authRouter from './auth.route';
import checkinRouter from './checkin.route';
import luckyDrawRouter from './luckydraw.route';
// import projectRouter from './project.route';
 
 
const router = express.Router();
 
router.use('/', indexRouter);
router.use('/api/auth', authRouter);
router.use('/api/checkin', checkinRouter);
router.use('/api/luckydraw', luckyDrawRouter);
 
export default router;
