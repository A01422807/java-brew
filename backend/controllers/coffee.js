// 1. Load the Coffee model
var Coffee = require('../models/coffee.js');

// 2. Get a paginated list of all People
exports.list = function(req, res){
  var query = {};
  var page = req.params.page || 1;
  var options = {
    page: page
  };
  Coffee.paginate(query, options).then(function(result) {
    res.json(result);
  });
};

// 2. Get an individual Coffee's public information
exports.byId = function(req, res){
  Coffee.findById(req.params.id)
    .exec(function(err, doc){
      if(err || doc === null){
        res.status(404).json({error: 'CoffeeNotFound'});
      } else {
        res.json(doc);
      }
  });
};