(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.TinyObservable = factory());
}(this, function () { 'use strict';

    const Subscription = (function () {
        function Subscription(observable, success) {
            this.id = `${Math.random()}`.split('.').join('');
            this.observable = observable;
            this.success = success;
        }
        Subscription.prototype.unsubscribe = function () {
            this.observable.observers = this.observable.observers.filter(s => s.id !== this.id);
        };
        return Subscription;
    })();
    const EventSubscription = (function () {
        function EventSubscription(observable, success) {
            this.id = `${Math.random()}`.split('.').join('');
            this.observable = observable;
            this.success = success;
        }
        EventSubscription.prototype.unsubscribe = function () {
            this.observable.observers = this.observable.observers.filter(s => s.id !== this.id);
            this.observable.elementListeners = this.observable.elementListeners.filter(l => {
                if (l.listenerFn === this.success) {
                    l.el.removeEventListener(l.eventType, l.listenerFn, false);
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        return EventSubscription;
    })();
    const TinyObservable = (function () {
        function TinyObservable(type = 'normal') {
            this.observers = [];
            this.elementListeners = [];
            this.type = type;
        }
        TinyObservable.prototype.subscribe = function (success) {
            let sub;
            switch (this.type) {
                case 'normal':
                    sub = new Subscription(this, success);
                    break;
                case 'raf':
                    sub = new Subscription(this, success);
                    window.requestAnimationFrame(t => this.next(t));
                    break;
                case 'event':
                    sub = new EventSubscription(this, success);
                    break;
            }
            this.observers.push(sub);
            return sub;
        };
        TinyObservable.prototype.next = function (val) {
            if (this.type === 'raf') {
                window.requestAnimationFrame(t => this.next(t));
            }
            this.observers.forEach(o => o.success(val));
        };
        TinyObservable.fromEvent = function (eventType, el) {
            const obs = new TinyObservable('event');
            const listenerFn = obs.next.bind(obs);
            el.addEventListener(eventType, listenerFn);
            obs.elementListeners.push({ el, eventType, listenerFn });
            return obs;
        };
        TinyObservable.fromRaf = function () {
            const obs = new TinyObservable('raf');
            return obs;
        };
        return TinyObservable;
    })();

    return TinyObservable;

}));
