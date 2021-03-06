var express = require("express");

var router = express.Router();

// Import the model (newburger.js) to use its database functions.
var newburger = require("../models/newburger.js");

// Create all our routes and set up logic within those routes where required.


router.post("/api/burgers", function(req, res) { 
  newburger.create([
    "newburger_name", "wholeburger"
  ], [
    req.body.newburger_name, req.body.wholeburger
  ], function(result) {
    // Send back the ID of the new burger
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  // console.log("condition", condition);

  newburger.update({
    wholeburger: req.body.wholeburger
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  newburger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  }); 
}); 

router.get("/", function(req, res) {
  newburger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
  
    res.render("index", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
