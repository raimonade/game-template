import * as PIXI from "pixi.js";
import { isConstructorDeclaration } from 'typescript';
import Events from './Events';
import PIXITimings from './utils/PIXITimings';

export default class Game {
    private static _root: HTMLElement;
    public static get Root() : HTMLElement {
        return this._root;
    }

    private static _game: PIXI.Application;
    public static get Game(): PIXI.Application {
        return  this._game
    }

    private static _events: Events;
	public static get Events() {
		return this._events;
    }

    private static _Timings: PIXITimings;
    public static get Timings(){
        return Game._Timings;
    }
    
    	// Time in seconds
	public static get time() {
		return Game.Timings.currentTime / 1000;
	}

    private _activeScenes: PIXI.Container[];

    constructor(element: HTMLElement){
        Game._root = element;

        this._activeScenes = [];
    
        this.setupPixi();
    }

    private setupPixi(){
        Game._game = new PIXI.Application({
            backgroundColor: 0xE0F0DA, 
        });

        Game._game.ticker.maxFPS = 60;
        Game._game.view.style.position = 'absolute';
        Game.Root.appendChild(Game._game.view);

        this.createGame();

    }

    private createGame() {
        Game._events = new Events();
    }
}