import { Observable, Subscriber } from 'rxjs';
import { TeardownLogic } from 'rxjs/Subscription';
export declare class AutorunObservable<T> extends Observable<T> {
    private autorunCallback;
    static create<T>(autorunCallback: () => T | Mongo.Cursor<any>): Observable<T>;
    private zone;
    constructor(autorunCallback: () => T | Mongo.Cursor<any>);
    protected _subscribe(subscriber: Subscriber<T>): TeardownLogic;
}
