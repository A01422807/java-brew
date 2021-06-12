// 1. Load the Coffee model
var FavoriteCoffee = require('../models/favoriteCoffee.js');

exports.getFavorites = (query) => {
	return FavoriteCoffee.find({ userId: query.userId }, function (err, response) {
		if(err) return err
		return response;
	})
}

exports.addFavorite = (query) => {
	var coffee = new FavoriteCoffee(query)
	return coffee.save();
}