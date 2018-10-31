"use strict";
exports.__esModule = true;
var attackData_controller = require("../controllers/attackData.controller");

var AttackDataRoutes = (function () {
    function AttackDataRoutes(router) {
        this.router = router;
        this.attackDataController = new attackData_controller.AttackDataController();
        this.init();
    }
    AttackDataRoutes.prototype.init = function () {
        this.router.get('/getAttackData', this.attackDataController.GetattackDataList);
    };
    return AttackDataRoutes;
}());
exports.AttackDataRoutes = AttackDataRoutes;
