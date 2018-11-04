'use strict';

function Ticker() {
    this._i = 0

    Ticker.prototype.tick = () => {
        console.log(this._i++);
    }
};

const ticker = new Ticker();
setInterval(ticker.tick, 1000);
