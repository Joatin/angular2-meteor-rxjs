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
        return new (ValidatedMethodObservable.bind.apply(ValidatedMethodObservable, [void 0].concat([method], args)))();
    };
    ValidatedMethodObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        (_a = this.method).call.apply(_a, this.args.concat([function (error, value) {
                _this.zone.run(function () {
                    if (error) {
                        subscriber.error(error);
                    }
                    else {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                });
            }]));
        var _a;
    };
    return ValidatedMethodObservable;
}(Observable));
