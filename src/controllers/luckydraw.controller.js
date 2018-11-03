import models from '../models';

const Op = models.Sequelize.Op;

class LuckyDrawController {
  // List out all gifts
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.LuckyDrawGift.findAll().then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // Show it onto the screen
  async show(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.LuckyDrawGift.findOne({
        where: {
          id: req.params.giftId
        }
      }).then(gift => {
        if (!gift) {
          return res.status(404).send({success: false, msg: 'Gift not found.'});
        } else {
          // TODO: 
          // SHOW IT ON SCREEN THROUGH SOCKET.IO
          //
          return res.status(200).send({result:true});
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async draw(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.LuckyDrawGift.findOne({
        where: {
          id: req.params.giftId
        }
      }).then(gift => {
        if (!gift) {
          return res.status(404).send({success: false, msg: 'Gift not found.'});
        } else {
          models.User.findAll({
            order: models.sequelize.random(), 
            limit: req.body.winnerCount,
            where: {
              isWinner: false
            },
            attributes: ['id', 'username', 'firstName', 'lastName']
          }).then(winners => {
            winners.forEach(winner => {
              models.LuckyDrawWinner.create({
                UserId: winner.id,
                LuckyDrawGiftId: gift.id,
                removed: false
              });
              models.User.update({isWinner: 1}, {where: {id: winner.id}});
            });

            // TODO: 
            // SHOW IT ON SCREEN THROUGH SOCKET.IO
            //
            return res.status(200).send({success: true, winners: winners});
          }); 
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async redraw(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.LuckyDrawGift.findOne({
        where: {
          id: req.params.giftId
        }
      }).then(gift => {
        if (!gift) {
          return res.status(404).send({success: false, msg: 'Gift not found.'});
        } else {
          console.log("123");
          console.log(req.body.removedWinners.length);
          models.LuckyDrawWinner.update({
            removed: true
          },{
            where: {
              LuckyDrawGiftId: gift.id,
              UserId: {
                [Op.in]: req.body.removedWinners
              }
            }
          });

          // TODO: 
          // REMOVE EX-WINNERS FROM SCREEN THROUGH SOCKET.IO
          //
          models.User.findAll({
            order: models.sequelize.random(),
            limit: req.body.removedWinners.length,
            where: {
              isWinner: false
            },
            attributes: ['id', 'username', 'firstName', 'lastName']
          }).then(winners => {
            winners.forEach(winner => {
              models.LuckyDrawWinner.create({
                UserId: winner.id,
                LuckyDrawGiftId: gift.id,
                removed: false
              });
              models.User.update({isWinner: 1}, {where: {id: winner.id}});
            });
            // TODO: 
            // SHOW IT ON SCREEN THROUGH SOCKET.IO
            //
            return res.status(200).send({success: true, winners: winners});
          });
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new LuckyDrawController();