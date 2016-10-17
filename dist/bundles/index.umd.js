(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'rxjs', '@angular/core'], factory) :
    (factory((global.angular2 = global.angular2 || {}, global.angular2.meteor = global.angular2.meteor || {}, global.angular2.meteor.rxjs = global.angular2.meteor.rxjs || {}),global.rxjs,global.@angular/core));
}(this, (function (exports,rxjs,_angular_core) { 'use strict';

var AutorunObservable = (function (_super) {
    __extends(AutorunObservable, _super);
    function AutorunObservable(autorunCallback) {
        _super.call(this);
        this.autorunCallback = autorunCallback;
        this.zone = new _angular_core.NgZone({});
    }
    AutorunObservable.create = function (autorunCallback) {
        return new AutorunObservable(autorunCallback);
    };
    AutorunObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var handle = Tracker.autorun(function () {
            var value = _this.autorunCallback();
            if (value instanceof Mongo.Cursor) {
                var result_1 = value.fetch();
                _this.zone.run(function () {
                    subscriber.next(result_1);
                });
            }
            else {
                _this.zone.run(function () {
                    subscriber.next(value);
                });
            }
        });
        return function () {
            handle.stop();
        };
    };
    return AutorunObservable;
}(rxjs.Observable));

var MeteorMethodObservable = (function (_super) {
    __extends(MeteorMethodObservable, _super);
    function MeteorMethodObservable(name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _super.call(this);
        this.name = name;
        this.zone = new _angular_core.NgZone({});
        this.args = args;
    }
    MeteorMethodObservable.create = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new MeteorMethodObservable(name, args);
    };
    MeteorMethodObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        Meteor.call(this.name, this.args, function (error, value) {
            _this.zone.run(function () {
                if (error) {
                    subscriber.error(error);
                }
                else {
                    subscriber.next(value);
                    subscriber.complete();
                }
            });
        });
    };
    return MeteorMethodObservable;
}(rxjs.Observable));

var ValidatedMethodObservable = (function (_super) {
    __extends(ValidatedMethodObservable, _super);
    function ValidatedMethodObservable(method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _super.call(this);
        this.method = method;
        this.zone = new _angular_core.NgZone({});
        this.args = args;
    }
    ValidatedMethodObservable.create = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new ValidatedMethodObservable(method, args);
    };
    ValidatedMethodObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        this.method.call(this.args, function (error, value) {
            _this.zone.run(function () {
                if (error) {
                    subscriber.error(error);
                }
                else {
                    subscriber.next(value);
                    subscriber.complete();
                }
            });
        });
    };
    return ValidatedMethodObservable;
}(rxjs.Observable));

exports.AutorunObservable = AutorunObservable;
exports.MeteorMethodObservable = MeteorMethodObservable;
exports.ValidatedMethodObservable = ValidatedMethodObservable;

Object.defineProperty(exports, '__esModule', { value: true });

})));
