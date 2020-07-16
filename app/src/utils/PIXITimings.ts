import * as PIXI from 'pixi.js';
import ArrayUtils from './ArrayUtils';

export interface Timer {
    isDone: boolean;
    start: (time: number) => void;
    update: (time: number) => void;
}

class Timing implements Timer {
    protected _callback: () => void;
    protected _timeout: number;

    constructor(callback: () => void, timeout: number) {
        this._callback = callback;
        this._timeout = timeout;
    }

    protected _isDone = false;
    public get isDone() {
        return this._isDone;
    }

    public start(time: number) { };
    public update(time: number) { };
}

class TimeoutTiming extends Timing {
    private _startTime: number;

    public start(time: number) {
        this._startTime = time;
    };

    public update(time: number) {
        if (time > this._startTime + this._timeout) {
            this._callback();
            this._isDone = true;
        }
    };
}

class IntervalTiming extends Timing {
    private _lastEmitTime: number = 0;


    public start(time: number) {
        this._lastEmitTime = time;
    };

    public update(time: number) {
        let timeDiff = time - this._lastEmitTime;

        while (timeDiff > this._timeout) {
            this._callback();

            timeDiff -= this._timeout;
            this._lastEmitTime += this._timeout;
        }
    };

}

export default class PIXITimings {
    private _timings: Timing[] = [];
    private _ticker: PIXI.Ticker;

    private _currentTime: number = 0;
    public get currentTime() {
        return this._currentTime;
    }

    constructor(ticker: PIXI.Ticker) {
        this._ticker = ticker;

        this._ticker.add(this.update);

    }

    private update = () => {
        this._currentTime += this._ticker.elapsedMS;

        this._timings.forEach(t => {
            try {
                t.update(this._currentTime);
            } catch (e) {
                console.error(e);
            }

            if (t.isDone) {
                ArrayUtils.removeElement(this._timings, t);
            }
        });
    };

    public setTimeout(callback: () => void, timeout: number): Timing {
        const timing = new TimeoutTiming(callback, timeout);
        return this.addTiming(timing);
    };

    public setInterval(callback: () => void, timeout: number){
        const timing = new IntervalTiming(callback, timeout);
        return this.addTiming(timing);
    }

    private addTiming(timing: Timing) : Timing {
        timing.start(this._currentTime);

        if(!timing.isDone){
            this._timings.push(timing);
        }

        return timing;
    }

    public clear(handle: Timing) {
        if(!handle) {
            return;
        }

        ArrayUtils.removeElement(this._timings, handle);
    }

}