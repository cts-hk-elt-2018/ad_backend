import models from '../models';
import sns from '../config/sns';

class notificationController {
  // List out all questions
  async ios(req, res) {
    if (req.user && req.user.username && (req.user.role >= 2)) {
      const snsClient = sns.snsClient;
      const devParams = sns.iosDevCreateEndpointParams;
      const prodParams = sns.iosProdCreateEndpointParams;

      devParams.Token = req.body.token;
      devParams.CustomUserData = req.user.username + ' ' + req.user.firstName + ' ' + req.user.lastName;
      prodParams.Token = req.body.token;
      prodParams.CustomUserData = req.user.username + ' ' + req.user.firstName + ' ' + req.user.lastName;

      snsClient.createPlatformEndpoint(devParams, (err, data) => {
        if (err) {
          return res.status(500).send({success: false, msg: 'Error'});
        } else {
          const subscribeParams = sns.subscribeParams;
          subscribeParams.Endpoint = data.EndpointArn;
          snsClient.subscribe(subscribeParams, (err, data) => {
            if (err) {
              return res.status(500).send({success: false, msg: 'Error'});
            }
          });
        }
      });

      snsClient.createPlatformEndpoint(prodParams, (err, data) => {
        if (err) {
          return res.status(500).send({success: false, msg: 'Error'});
        } else {
          const subscribeParams = sns.subscribeParams;
          subscribeParams.Endpoint = data.EndpointArn;
          models.User.update({endpointArn: data.EndpointArn}, {where: {id: req.user.id}});
          snsClient.subscribe(subscribeParams, (err, data) => {
            if (err) {
              return res.status(500).send({success: false, msg: 'Error'});
            }
          });
        }
      });

      return res.status(200).send({success: true});

    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new notificationController();
