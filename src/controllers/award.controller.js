import models from '../models';

class awardController {
  // List out all awards
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.Award.findAll().then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // List out all awardees
  async listAwardee(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.Awardee.findAll({
        include: [
          {model: models.User}, 
          {model: models.Award}
        ]
      }).then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // Show award onto the screen
  async show(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.Award.findOne({
        where: {
          id: req.params.questionId
        }
      }).then(award => {
        if (!award) {
          return res.status(404).send({success: false, msg: 'Award not found.'});
        } else {
          //Screen Display
          res.screen.emit('current_page', 'award');
          models.Option.update({value: 'award'}, {where: {key: 'currentPage'}});

          res.screen.emit('award_current_award', award);
          models.Option.update({value: 0}, {where: {key: 'currentGameQuestionId'}});
          res.screen.emit('award_empty_awardee', null);

          models.Awardee.findAll({
            include: [{
              model: models.User
            }],
            where: {
              eventId: req.params.eventId
            }
          }).then(result => {
            return res.json({success: true, result: result});
          });
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // Show awardee onto the screen
  async showAwardee(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.Awardee.findOne({
        include: [{
          model: models.User
        }],
        where: {
          id: req.params.awardeeId
        }
      }).then(awardee => {
        if (!awardee) {
          return res.status(404).send({success: false, msg: 'Awardee not found.'});
        } else {
          //Screen Display
          res.screen.emit('award_awardee', awardee);

          return res.status(200).send({success:true});
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new awardController();
