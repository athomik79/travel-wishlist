const connection = require('../config/connection.js');

/**
 * This is a function.
 *
 * @param {string} num - A string param
 * @return {string} A good string
 */
function createQmarks(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
}


/**
 * This is a function.
 *
 * @param {string} ob - Translates sql
 * @return {string} A good string
 */
function translateSql(ob) {
  const arr = [];
  // eslint-disable-next-line guard-for-in
  for (const key in ob) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = '\'' + value + '\'';
      }
      arr.push(key + '=' + value);
    }
  }
  return arr.toString();
}
// Object for all our SQL statement functions.
const orm = {
  selectAll: function(table, cb) {
    const dbQuery = 'SELECT * FROM ' + table + ';';

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  insertOne: function(table, cols, vals, cb) {
    const dbQuery =
        'INSERT INTO ' +
        table +
        ' (' +
        cols.toString() +
        ') ' +
        'VALUES (' +
        createQmarks(vals.length) +
        ') ';

    console.log(dbQuery);
    connection.query(dbQuery, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    const dbQuery =
        'UPDATE ' +
        table +
        ' SET ' +
        translateSql(objColVals) +
        ' WHERE ' +
        condition;

    console.log(dbQuery);
    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  deleteOne: function(table, condition, cb) {
    const dbQuery = 'DELETE FROM ' + table + ' WHERE ' + condition;
    console.log(dbQuery);

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
};


// Export the orm object for the model (cat.js).
module.exports = orm;
