import {Observable, Subscriber} from "rxjs";
import {NgZone} from "@angular/core";

export class MeteorMethodObservable<T> extends Observable<T>{
    public static create<T>(name: string, ...args: any[]): Observable<T>{
        return new MeteorMethodObservable<T>(name, ...args);
    }

    private args: any[];
    private zone: NgZone = new NgZone({});

    public constructor(
        private name: string,
        ...args: any[]
    ){
        super();
        this.args = args;
    }

    protected _subscribe(subscriber: Subscriber<T>): void{
        Meteor.call(this.name, ...this.args.concat([(error: Meteor.Error, value: T)=>{
            this.zone.run(() => {
                if(error){
                    subscriber.error(error);
                }else{
                    subscriber.next(value);
                    subscriber.complete();
                }
            });
        }]));
    }
}