// 1. Include required modules
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
mongoosePaginate = require('mongoose-paginate');

// 2. Define the MongoDB schema for the coffee collection
var coffeeSchema = new Schema({
    "Region": {
      "type": "String"
    },
    "Aroma": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "aromaN": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "Flavor": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "flavorN": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "Aftertaste": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "aftertasteN": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "Acidity": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "acidityN": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "Body": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "bodyN": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "Balance": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "balanceN": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "Moisture": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "moistureN": {
      "$numberDouble": {
        "type": "String"
      }
    },
    "altitude_mean_meters": {
      "$numberInt": {
        "type": "String"
      }
    },
    "altitudeN": {
      "$numberInt": {
        "type": "String"
      }
    }
  }, { collection: 'coffee' });

// 3. Paginate the results
coffeeSchema.plugin(mongoosePaginate);

// 4. Export the Coffee model
module.exports = mongoose.model('Coffee', coffeeSchema);