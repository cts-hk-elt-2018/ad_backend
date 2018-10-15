import models from '../models';

class CheckinController {
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 2)) {  
      models.Checkin.findAndCountAll({
        attributes: ['createdAt'],
        include: [{
          model: models.User,
          attributes: ['username', 'firstName', 'lastName']
        }],
        where: {
          eventId: req.params.eventId
        }
      }).then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async count(req, res) {
    if (req.user && req.user.username && (req.user.role == 2)) {  
      models.Checkin.count({
        where: {
          eventId: req.params.eventId
        }
      }).then(c => {
        return res.json({success: true, count: c});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async show(req, res) {
    if (req.user && req.user.username && (req.user.role == 2)) {
      models.User.findOne({
        where: {
          username: req.params.username
        }
      }).then(user => {
        if (!user) {
          return res.status(404).send({success: false, msg: 'User not found.'});
        } else {
          models.Checkin.findOne({
            where:{
              UserId: user.id,
              eventId: req.params.eventId
            }
          }).then(checkin => {
            if (!checkin) {
              res.status(200).send({result: false});
            } else {
              res.status(200).send({result: true});
            }
          });
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async create(req, res) {
    if (req.user && req.user.username && (req.user.role == 2)) {  
      models.User.findOne({
        where: {
          username: req.params.username
        }
      }).then(user => {
        if (!user) {
          return res.status(404).send({success: false, msg: 'User not found.'});
        } else {
          models.Checkin.findOne({
            where:{
              UserId: user.id,
              eventId: req.params.eventId
            }
          }).then(checkin => {
            if (!checkin) {
              models.Checkin.create({
                UserId: user.id,
                eventId: req.params.eventId
              }).then(user => {
                return res.json({success: true, msg: 'User checked in.'});
              }).catch(err => {
                return res.json({success: false, msg: 'Error'});
              });
            } else {
              return res.json({success: false, msg: 'User already checked in.'});
            }
          });        
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async remove(req, res) {
    if (req.user && req.user.username && (req.user.role == 2)) {  
      models.User.findOne({
        where: {
          username: req.params.username
        }
      }).then(user => {
        if (!user) {
          return res.status(404).send({success: false, msg: 'User not found.'});
        } else {
          models.Checkin.destroy({
            where:{
              UserId: user.id,
              eventId: req.params.eventId
            }
          }).then(checkin => {
            if (!checkin) {
              return res.json({success: false, msg: 'Checked in not existed.'});
            } else {
              return res.json({success: true, msg: 'Checkin deleted.'});
            }
          });        
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new CheckinController();