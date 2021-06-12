// 1. Include required modules
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
mongoosePaginate = require('mongoose-paginate');

// 2. Define the MongoDB schema for the coffee collection
var coffeeSchema = new Schema({
    "Aroma": {
      "type": "Number"
    },
    "aromaN": {
      "type": "Number"
    },
    "Flavor": {
      "type": "Number"
    },
    "flavorN": {
      "type": "Number"
    },
    "Aftertaste": {
      "type": "Number"
    },
    "aftertasteN": {
      "type": "Number"
    },
    "Acidity": {
      "type": "Number"
    },
    "acidityN": {
      "type": "Number"
    },
    "Body": {
      "type": "Number"
    },
    "bodyN": {
      "type": "Number"
    },
    "Balance": {
      "type": "Number"
    },
    "balanceN": {
      "type": "Number"
    },
    "Moisture": {
      "type": "Number"
    },
    "moistureN": {
      "type": "Number"
    },
    "altitude_mean_meters": {
      "type": "Number"
    },
    "altitudeN": {
      "type": "Number"
    },
    "Region": {
      "type": "String"
    }
  }, { collection: 'coffee' });

// 3. Paginate the results
coffeeSchema.plugin(mongoosePaginate);

// 4. Export the Coffee model
module.exports = mongoose.model('Coffee', coffeeSchema);