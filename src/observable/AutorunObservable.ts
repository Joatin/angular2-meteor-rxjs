import {Observable, Subscriber} from 'rxjs';
import {TeardownLogic} from 'rxjs/Subscription';
import {NgZone} from "@angular/core";

export class AutorunObservable<T> extends Observable<T>{
    public static create<T>(autorunCallback: () => T | Mongo.Cursor<any>): Observable<T>{
        return new AutorunObservable<T>(autorunCallback);
    }

    private zone: NgZone = new NgZone({});

    public constructor(
        private autorunCallback: () => T | Mongo.Cursor<any>
    ){
        super();
    }

    protected _subscribe(subscriber: Subscriber<T>): TeardownLogic{
        let handle = Tracker.autorun(() => {
            let value = this.autorunCallback();
            if(value instanceof Mongo.Cursor){
                let result: T = <T><Object>(<Mongo.Cursor<any>>value).fetch();
                this.zone.run(() => {
                    subscriber.next(result);
                });
            } else {
                this.zone.run(() => {
                    subscriber.next(<T>value);
                });
            }
        });

        return () => {
            handle.stop();
        }
    }
}