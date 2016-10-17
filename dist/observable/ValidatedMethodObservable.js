import { Observable } from "rxjs";
import { NgZone } from "@angular/core";
export var ValidatedMethodObservable = (function (_super) {
    __extends(ValidatedMethodObservable, _super);
    function ValidatedMethodObservable(method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _super.call(this);
        this.method = method;
        this.zone = new NgZone({});
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
}(Observable));
