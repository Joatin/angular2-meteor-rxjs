import {Observable, Subscriber} from "rxjs";
import {NgZone} from "@angular/core";

export interface IValidatedMethodCallable{
    call(...args: any[]): any;
}

export class ValidatedMethodObservable<T> extends Observable<T>{
    public static create<T>(method: IValidatedMethodCallable, ...args: any[]): Observable<T>{
        return new ValidatedMethodObservable<T>(method, args);
    }

    private args: any[];
    private zone: NgZone = new NgZone({});

    public constructor(
        private method: IValidatedMethodCallable,
        ...args: any[]
    ){
        super();
        this.args = args;
    }

    protected _subscribe(subscriber: Subscriber<T>): void{
        this.method.call(this.args, (error, value)=>{
            this.zone.run(() => {
                if(error){
                    subscriber.error(error);
                }else{
                    subscriber.next(value);
                    subscriber.complete();
                }
            });
        });

    }
}