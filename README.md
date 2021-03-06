[![Build Status](https://travis-ci.org/Joatin/angular2-meteor-rxjs.svg?branch=master)](https://travis-ci.org/Joatin/angular2-meteor-rxjs) [![npm version](https://badge.fury.io/js/angular2-meteor-rxjs.svg)](https://badge.fury.io/js/angular2-meteor-rxjs)

# angular2-meteor-rxjs
Helpers for mapping meteor autorun contexts to observables

Remember that all of the exported observables are cold. That means that you have to subscribe before any action is
taken, or you have to make them hot by other means.

# Usage
## AutorunObservable
Takes a callback as parameter that is run within an autorun context.
```typescript
import {AutorunObservable} from 'angular2-meteor-rxjs';

let observable = new AutorunObservable<User[]>(() => {
    Meteor.subscribe('users.all');
    return Meteor.users.find({'profile.name': 'Joatin'}).fetch();
})
```

## MeteorMethodObservable
Takes the name of the method and the parameters and wraps the result of the call into a observable.
```typescript
import {MeteorMethodObservable} from 'angular2-meteor-rxjs';

let observable = new MeteorMethodObservable<string>('texts.insert', 'sample text');
```

## ValidatedMethodObservable
Takes the validated method and the parameters and wraps the result of the call into a observable.
```typescript
import {ValidatedMethodObservable} from 'angular2-meteor-rxjs';
import {insertText} from './both/methods/texts.methods';

let observable = new ValidatedMethodObservable<string>(insertText, 'sample text');
```