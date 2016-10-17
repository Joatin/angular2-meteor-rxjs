import {Observable, Subscriber} from 'rxjs';
import {TeardownLogic} from 'rxjs/Subscription';
import {NgZone} from "@angular/core";

/**
 * An observable that takes an autorun callback as parameter. The returned result from the callback is then passed on in
 * the observable.
 *
 * @version 1.0.0
 */
export class AutorunObservable<T> extends Observable<T>{
    public static create<T>(autorunCallback: () => T): Observable<T>{
        return new AutorunObservable<T>(autorunCallback);
    }

    private zone: NgZone = new NgZone({});

    public constructor(
        private autorunCallback: () => T
    ){
        super();
    }

    protected _subscribe(subscriber: Subscriber<T>): TeardownLogic{
        let handle = Tracker.autorun(() => {
            let result = this.autorunCallback();
            this.zone.run(() => {
                subscriber.next(result);
            });
        });

        return () => {
            handle.stop();
        }
    }
}