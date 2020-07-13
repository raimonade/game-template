import * as PIXI from 'pixi.js';

const oldDestroy = PIXI.Container.prototype.destroy;
PIXI.Container.prototype.destroy = function(options) {
    PIXI.Container.prototype.emit.call(this, 'destroy');

    const defaultOptions = {
        children: true,
    };

    oldDestroy.call(this, { ...defaultOptions, ...options });
};

PIXI.Container.prototype.isDestroyed = function() {
    return this._destroyed;
};