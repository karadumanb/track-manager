var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var trackSchema = new Schema({
  title: String,
  description: String,
  elapsed: Number,
  runningSince: Number
//   amount: Number,
//   month: String,
//   year: Number
});
module.exports = mongoose.model('Track', trackSchema);