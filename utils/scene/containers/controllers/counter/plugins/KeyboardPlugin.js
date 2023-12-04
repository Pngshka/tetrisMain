'use strict';

import { BasePlugin } from "./BasePlugin.js";
import { InputController } from '../input-controller.js';
import GameControllerTetris from "../Tetris/GameControllerTetris.js";


export class KeyboardPlugin extends BasePlugin {
    constructor(inputController, renderer, target) {
        super(inputController, target);

        this.gameControllerTetris = new GameControllerTetris(renderer);

        if (target) {
            this.startAndEndEvent = this.startAndEndEvent.bind(this);
        }
    }

    #lastEvent;
    attach(target) {
        this.detach();
        this._target = target;
        this.#lastEvent = this.startAndEndEvent.bind(this);
        this._target.addEventListener('keydown', this.#lastEvent);
        this._target.addEventListener('keyup', this.#lastEvent);
    }

    detach() {
        if (!this._target) return;
        this._target.removeEventListener('keydown', this.#lastEvent);
        this._target.removeEventListener('keyup', this.#lastEvent);
        this.enable = false;
    }

    getActionEvent(e) {
        return e.type === 'keydown' ? InputController.ACTION_ACTIVATED : InputController.ACTION_DEACTIVATED;
    }

    startAndEndEvent(e) {
        const ACTION = this.getActionEvent(e);

        if (e.repeat) return;
        if (this._inputController.enabled === false) return;

        const goodActives = Array.from(this._inputController.activites.values())
            .filter(x => x.enable && x.keys.includes(e.keyCode));
            //.filter(x => x.enable && x instanceof ActivWithMouseCode && x.keys.includes(e.which));
            //console.log(goodActives);

        for (let index in goodActives) {
            const goodActiv = goodActives[index];
           // console.log(goodActiv.name)
            const activeButtons = Array.from(goodActiv.keys.values())
                .filter(x => this.isKeyPressed(x));


            if (!!activeButtons.length && ACTION === 'input-controller:action-activated') {
                return;
            }

            const eventName = ACTION;
            let event = new CustomEvent(eventName, {
                detail: { name: goodActiv.name }
            });
            this._target.dispatchEvent(event);
            if (ACTION=='input-controller:action-activated') {
                goodActiv.activeNow++;
                this.gameControllerTetris.chekingClicks(goodActiv.name);
            }
            else
                goodActiv.activeNow--;
            //console.log(goodActiv.activeNow);
            console.log(goodActiv.activeNow);
        }
    }

    isKeyPressed(keyCode) {
        const pressedKeys = {};

        function keyPressed(event) {
            pressedKeys[event.keyCode] = true;
        }

        function keyReleased(event) {
            delete pressedKeys[event.keyCode];
        }


        document.addEventListener("keydown", keyPressed);
        document.addEventListener("keyup", keyReleased);

        return pressedKeys[keyCode] === true;
    }
}
