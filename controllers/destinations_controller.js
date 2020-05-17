const express = require('express');
// Import the model (destination.js) to use its database functions.
const destination = require('../models/destination.js');
const router = express.Router();

// router connections

// get router
router.get('/', function(req, res) {
  destination.selectAll(function(data) {
    const hbsObj = {
      destinations: data,
    };
    console.log(hbsObj);
    res.render('index', hbsObj);
  });

  // post router
  router.post('/api/destinations', function(req, res) {
    destination.insertOne(
        ['destination_name', 'travelled'],
        [req.body.destination_name, req.body.travelled],
        function(result) {
          // send back ID of new destination
          res.json({id: result.insertId});
        },
    );
  });

  // put router
  router.put('/api/destinations/:id', function(req, res) {
    const condition = 'id = ' + req.params.id;

    console.log('condition', condition);
    destination.updateOne({travelled: req.body.travelled}, condition, function(
        result,
    ) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  // delete router
  router.delete('/api/destinations/:id', function(req, res) {
    const condition = 'id = ' + req.params.id;
    console.log('condition', condition);

    destination.deleteOne(condition, function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
});

// Export routes for server.js to use.
module.exports = router;
