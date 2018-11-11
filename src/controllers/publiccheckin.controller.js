import models from '../models';
import sns from '../config/sns';

class publicCheckinController {
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
            models.User.update({isCheckedIn: 1}, {where: {id: user.id}});
            models.Checkin.create({
              UserId: user.id,
              eventId: req.body.eventId
            }).then(checkin => {
              if (user.isAwardee) {
                //send notification
                const snsClient = sns.snsClient;
                const params = sns.publishParams;

                var msg = 'Awardee ' + user.firstName + ' ' + user.lastName + ' (' + user.username + ') has just checked in.';
                var payload = {
                  default: msg,
                  APNS: {
                    aps: {
                      alert: msg,
                      sound: 'default'
                    }
                  }
                };

                payload.APNS = JSON.stringify(payload.APNS);
                payload = JSON.stringify(payload);

                params.Message = payload;

                snsClient.publish(params, (err, data) => {
                  if (err) {
                    return res.status(500).send({success: false, msg: 'Error'});
                  }
                  return res.json({success: true, msg: 'User checked in.', isAwardee: user.isAwardee});
                });
              } else {
                return res.json({success: true, msg: 'User checked in.', isAwardee: user.isAwardee});
              }
              
            }).catch(err => {
              return res.json({success: false, msg: 'Error'});
            });
          } else {
            return res.json({success: true, msg: 'User already checked in.', isAwardee: user.isAwardee});
          }
        });
      }
    });
  }
}

export default new publicCheckinController();
