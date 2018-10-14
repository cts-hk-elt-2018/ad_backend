import express from 'express';

const router = express.Router();
// var models  = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;
