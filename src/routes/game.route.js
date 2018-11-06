import gameController from '../controllers/game.controller';
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();
 
router.get('/list', passportManager.authenticate, gameController.index);
router.get('/:guestionId', passportManager.authenticate, gameController.show);
router.get('/:guestionId/next', passportManager.authenticate, gameController.nextResponse);
router.get('/:guestionId/previous', passportManager.authenticate, gameController.previousResponse);
 
export default router;
