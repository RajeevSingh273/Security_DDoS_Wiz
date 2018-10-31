"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var Promise = require("bluebird");
var Request = require("request");

var AttackDataApi = (function () {
    function AttackDataApi() {
    }

    AttackDataApi.prototype.GetAttackDataIP = function (query) {
        console.log("in remote API");
        Request.get("http://httpbin.org/ip", (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            console.dir(JSON.parse(body));
        });
        return new Promise(function (resolve, reject) {
            Request.get("http://httpbin.org/ip", (error, response, body) => {
                console.log("error:", error);
                console.log("response:", response);
                console.log("Body:", body);
                if (error) {
                    resolve(error);
                } else {
                    resolve(JSON.parse(body));
                }
                console.dir(JSON.parse(body));
            });
        }).catch(function (e) {
            throw e;
            // reject(e);
        });
    };

    AttackDataApi.prototype.GetAttackDataList = function (query) {
        return new Promise(function (resolve, reject) {
            Request.get("http://httpbin.org/ip", (error, response, body) => {
                if (error) {
                    resolve(error);
                } else {
                    resolve(JSON.parse(body));
                }
                console.dir(JSON.parse(body));
            });
        }).catch(function (e) {
            throw e;
            // reject(e);
        });
    };

    return AttackDataApi;
}());

exports.AttackDataApi = AttackDataApi;
