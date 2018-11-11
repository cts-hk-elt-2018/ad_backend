import pageController from "../controllers/page.controller";
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();

router.get('/list', passportManager.authenticate, pageController.index);
router.get('/:pageName', passportManager.authenticate, pageController.show);
 
export default router;
