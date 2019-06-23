let count = 0;
const out = document.querySelector('#out');
const obs = new TinyObservable();
const sub = obs.subscribe(r => {
    out.innerHTML = r;
});
const tmr = setInterval(() => {
    obs.next(`${count} - ${Math.random()}`);
    count++;
    if(count > 25) {
        sub.unsubscribe();
        clearInterval(tmr);
    }
}, 100);


const obs2 = TinyObservable.fromRaf();
console.log(obs2);