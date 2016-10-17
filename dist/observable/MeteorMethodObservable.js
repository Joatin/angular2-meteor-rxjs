import { Observable } from "rxjs";
import { NgZone } from "@angular/core";
export var MeteorMethodObservable = (function (_super) {
    __extends(MeteorMethodObservable, _super);
    function MeteorMethodObservable(name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _super.call(this);
        this.name = name;
        this.zone = new NgZone({});
        this.args = args;
    }
    MeteorMethodObservable.create = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new (MeteorMethodObservable.bind.apply(MeteorMethodObservable, [void 0].concat([name], args)))();
    };
    MeteorMethodObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        Meteor.call.apply(Meteor, [this.name].concat(this.args.concat([function (error, value) {
                _this.zone.run(function () {
                    if (error) {
                        subscriber.error(error);
                    }
                    else {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                });
            }])));
    };
    return MeteorMethodObservable;
}(Observable));
