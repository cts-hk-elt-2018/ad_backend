import pageController from "../controllers/page.controller";
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();

router.get('/', passportManager.authenticate, pageController.list);
router.get('/:pageName', passportManager.authenticate, pageController.show);
 
export default router;
