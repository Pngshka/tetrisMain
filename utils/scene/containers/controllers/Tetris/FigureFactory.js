import { AbstractFactory } from './AbstractFactory.js';
import Utilities from './Utilities.js'

export class FigureFactory extends AbstractFactory {
    getElement() {
        const clazz = this.args[0];
        // console.log(clazz);
        return new clazz();
    }

    getGoodElements() {
        const clazz = this.args[0];
        return this.pull.filter(x => x.constructor.name === clazz.name);
    }
}