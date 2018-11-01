"use strict";
exports.__esModule = true;
var requestClient = require("request");
var Promise = require("bluebird");
var lodash = require('lodash');
var common = require("../data.layer/models/common.model");
var attackData = require("../data.layer/models/attackData.model");
var attackDataContext = require("../data.layer/repositories/attackData.context");

var AttackDataBusinessProcess = (function () {
    function AttackDataBusinessProcess() {
    }

    AttackDataBusinessProcess.prototype.GetAttackDataListMONGO = function (query, callback) {
        var _attackDataRes = new attackData.AttackDataResponse();
        if (query.Id) {
            var objAttackDataContext = new attackDataContext.AttackDataContext();
            objAttackDataContext.GetAttackDataListMONGO(query).then(function (result) {
                if (result.length > 0) {
                    var _attackDataMap = AttackDataMap(query, result);
                    callback(null, _attackDataMap);
                } else {
                    var objAttackData = new attackData.AttackData();
                    objAttackData = [];
                    callback(null, objAttackData);
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
        else {
            _attackDataRes.AttackData = [];
            _attackDataRes.ResponseCode = 21;
            _attackDataRes.ErrorMessage = 'Invalid Id.';
            callback(null, _attackDataRes);
        }
    };   

    return AttackDataBusinessProcess;
}());
exports.AttackDataBusinessProcess = AttackDataBusinessProcess;

