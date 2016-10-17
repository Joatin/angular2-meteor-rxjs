import { Observable } from 'rxjs';
import { NgZone } from "@angular/core";
export var AutorunObservable = (function (_super) {
    __extends(AutorunObservable, _super);
    function AutorunObservable(autorunCallback) {
        _super.call(this);
        this.autorunCallback = autorunCallback;
        this.zone = new NgZone({});
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
}(Observable));
