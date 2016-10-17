import { Observable, Subscriber } from "rxjs";
export interface IValidatedMethodCallable<T> {
    call(...args: any[]): T;
}
export declare class ValidatedMethodObservable<T> extends Observable<T> {
    private method;
    static create<T>(method: IValidatedMethodCallable<T>, ...args: any[]): Observable<T>;
    private args;
    private zone;
    constructor(method: IValidatedMethodCallable<T>, ...args: any[]);
    protected _subscribe(subscriber: Subscriber<T>): void;
}
