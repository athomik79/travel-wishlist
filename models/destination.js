const orm = require('../config/orm.js');


// Call back orms
const destination = {
  selectAll: function(cb) {
    orm.selectAll('destinations', function(res) {
      cb(res);
    });
  },
  insertOne: function(cols, vals, cb) {
    orm.insertOne('destinations', cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne('destinations', objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne('destinations', condition, function(res) {
      cb(res);
    });
  },
};

module.exports = destination;
