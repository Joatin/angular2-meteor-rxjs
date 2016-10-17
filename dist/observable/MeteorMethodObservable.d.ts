import { Observable, Subscriber } from "rxjs";
export declare class MeteorMethodObservable<T> extends Observable<T> {
    private name;
    static create<T>(name: string, ...args: any[]): Observable<T>;
    private args;
    private zone;
    constructor(name: string, ...args: any[]);
    protected _subscribe(subscriber: Subscriber<T>): void;
}
