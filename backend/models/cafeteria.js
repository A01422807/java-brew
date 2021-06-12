// 1. Include required modules
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
mongoosePaginate = require('mongoose-paginate');

// 2. Define the MongoDB schema for the cafeteria collection
var cafeteriaSchema = new Schema({
    "Nombre": {
      "type": "String"
    }
  }, { collection: 'cafeterias' });

// 3. Paginate the results
cafeteriaSchema.plugin(mongoosePaginate);

// 4. Export the cafeteria model
module.exports = mongoose.model('Cafeteria', cafeteriaSchema);