import models from '../models';

class CheckinController {
  async checkin(req, res) {
    models.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({success: false, msg: 'User not found.'});
      } else {
        models.Checkin.findOne({
          where:{
            UserId: user.id,
            eventId: req.body.eventId
          }
        }).then(checkin => {
          if (!checkin) {
            models.Checkin.create({
              UserId: user.id,
              eventId: req.body.eventId
            }).then(user => {
              return res.json({success: true, msg: 'User checked in.'});
            }).catch(err => {
              return res.json({success: false, msg: 'Error'});
            });
          } else {
            return res.json({success: true, msg: 'User already checked in.'});
          }
        });
      }
    });
  }
}

export default new PublicCheckinController();
