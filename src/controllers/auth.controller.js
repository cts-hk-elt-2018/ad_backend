import models from '../models';
import securePassword from 'secure-password';

const pwd = securePassword();
const jwt = require('jsonwebtoken');
 
class Auth {
  signUp(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      var password = Buffer.from(req.body.password);
      pwd.hash(password, (err, hash) => {
        if (err) throw err;
        models.User.create({
          username: req.body.username,
          password: hash
        }).then(user => {
          res.json({success: true, msg: 'Successful created new user.'});
        }).catch(err => {
          res.json({success: false, msg: 'Username already exists.'});
        });
      });
    }
  }
  signIn(req, res) {
    models.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if(!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        var password = Buffer.from(req.body.password);
        pwd.verify(password, user.password, (err, result) => {
          if (err) throw err;
          switch (result) {
            case securePassword.VALID:
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY,{ expiresIn: '90d' });
              // return the information including token as JSON
              res.json({success: true, token: 'JWT ' + token});
              break;
            default:
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
              break;
          }
        });
      }
    }).catch(err => {
      throw err;
    });
  }
}
 
export default new Auth();
