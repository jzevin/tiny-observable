# TinyObservable:
## by Jeremy Zevin
**Why?** Because I wanted to see if I could make a very simple observable that I could use with various projects. Done without looking at anyone elses code.
___
### Install
`npm install zev-tiny-observable`
### Usage
Browser
```html
<script src="https://unpkg.com/zev-tiny-observable/dist/tinyObservable.min.js"></script>
```
module import
```html
import TinyObservable from 'zev-tiny-observable';
```

### API
### Static Contructor Methods
#### new TinyObservable()
example:
```javascript
const obs = new TinyObservable();
const sub = obs.subscribe(r => console.log(r));
obs.next('Hi!');
```
#### TinyObservable.fromRaf()
example:
```javascript
const rafObs = new TinyObservable.fromRaf();
const rafSub = rafObs.subscribe(t => console.log(t)) // will receive t from window.requestAnimationFrame
setTimeout(() => rafSub.unsubscribe(), 1000); // will unsubscribe in 1000ms
```

#### TinyObservable.fromEvent(eventType, element)
example:
```javascript
const eventObs = TinyObservable.fromEvent('mousemove', document.body);
const mouseMoveSub = eventObs.subscribe(e => console.log(e));
```

#### Subscription.unsubscribe()
example as seen above