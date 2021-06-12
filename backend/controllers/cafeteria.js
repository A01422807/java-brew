// 1. Load the Cafeteria model
var Cafeteria = require('../models/cafeteria.js');

// 2. Get a paginated list of all People
exports.list = function(req, res, client){

    var query = {};
    var page = req.params.page || 1;

    client.get('cafeteria' + page, async (err, cafeteria) => {
        if (err) throw err;

        if (cafeteria) {
            res.status(200).send({
                cafeterias: JSON.parse(cafeteria),
                message: "data retrieved from the cache"
            });
        }
        else {
            var options = {
                page: page
            };
            Cafeteria.paginate(query, options).then(function(result) {
                client.setex('cafeteria' + page, 600, JSON.stringify(result));
                res.status(200).send({
                    cafeterias: result,
                    message: "cache miss"
                });
            });

        }
    });
};

// 2. Get an individual Cafeteria's public information
exports.byId = function(req, res, client){
  var id = req.params.id;
  client.get('cafeteria' + id, async (err, cafeteria) => {
    if (err) throw err;

    if (cafeteria) {
        res.status(200).send({
            cafeteria: JSON.parse(cafeteria),
            message: "data retrieved from the cache"
        });
    }
    else {
        Cafeteria.findById(id)
            .exec(function(err, doc){
            if(err || doc === null){
                res.status(404).json({error: 'CafeteriaNotFound'});
            } else {
                client.setex('cafeteria' + id, 600, JSON.stringify(doc));
                res.status(200).send({
                    cafeteria: doc,
                    message: "cache miss"
                });
            }
        });
    }
  });
};