import models from '../models';

class pageController {

  // List out all pages
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.Page.findAll().then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
  // Show it onto the screen
  async show(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      //Screen Display
      res.screen.emit('current_page', req.params.pageName);

      return res.status(200).send({success: true});
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new pageController();
