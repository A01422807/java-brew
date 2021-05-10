// 1. Include config and modules
var config = require('./config');
var moment = require('moment');
var jwt = require('jwt-simple');
var Auth = require('./controllers/auth.js');
var People = require('./controllers/users.js');
var Coffee = require('./controllers/coffee.js');
var Person = require('./models/user.js');
// 2. Authentication Middleware
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ error: "TokenInvalid" });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ error: 'TokenExpired' });
  }
  // check if the user exists
  Person.findById(payload.id, function(err, person){
    if (!person){
      return res.status(401).send({error: 'PersonNotFound'});
    } else {
      req.user = person;
      next();
    }
  });
};

// 3. Routes
module.exports = function (app) {
  // 4. Authentication Routes
  app.post('/auth/login', Auth.login);
  app.post('/auth/signup', Auth.signup);
  // 5. Application Routes
  app.get('/users', ensureAuthenticated, People.list);
  app.get('/users/page/:page', ensureAuthenticated, People.list);
  app.get('/users/:id', ensureAuthenticated, People.show);
  app.get('/profile', ensureAuthenticated, People.profile);
  // 6. Coffee Routes
  app.get('/coffee', ensureAuthenticated, Coffee.list);
  app.get('/coffee/page/:page', ensureAuthenticated, Coffee.list);
  app.get('/coffee/:id', ensureAuthenticated, Coffee.byId);
};