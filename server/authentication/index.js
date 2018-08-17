const { User } = require('../../db/models');

const Authenticate = {
  login: (req, res) => {
    User.findOne({ where: {
      username: req.body.username
    }}).then(user => {
      if (user.dataValues.password === req.body.password) {
        res.status(200).send(user);
      } else {
        res.status(404).send();
      }
    }).catch(err => {
      res.status(400).send(err);
    })
  },

  signup: (req, res) => {
    User.findOrCreate({ where: {
      username: req.body.username,
      password: req.body.password
    }}).then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(201).send();
      }
    }).catch(err => {
      res.status(400).send(err);
    })
  }
};

module.exports = {
  Authenticate: Authenticate
};
