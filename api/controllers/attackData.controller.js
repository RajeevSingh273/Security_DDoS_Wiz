"use strict";
exports.__esModule = true;
var requestClient = require("request");
// var attackDataBusinessProcess = require("../../business.layer/attackData.BusinessProcess");
var attackData = require("../../data.layer/models/attack.model");
var attackDataApi = require("../../data.layer/remoteApi/attackData.api");

var AttackDataController = (function() {
  function AttackDataController() {}

  //Router is in attackData.Routes.js
  AttackDataController.prototype.GetattackDataList = function(req, res) {
    var Query = new attackData.Query();
    Query.Id = 1;
    Query.Ids = 22;
    console.log(Query);
    var objattackDataApi = new attackDataApi.AttackDataApi();
    objattackDataApi
      .GetAttackDataIP(Query)
      .then(function(result) {        
        console.log("Controller result:", result);       
            res.status(200)
                .json(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  return AttackDataController;
})();
exports.AttackDataController = AttackDataController;
