export class AbstractFactory {
    pull = [];
    args;

    construct(type) {
        this.args = [...arguments];
        const goodElements = this.getGoodElements(this.args);

        if (!goodElements.length)
            return this.getElement(this.args);

        const resultElement = goodElements[0];
        const indexOfGoodElement = this.pull.indexOf(resultElement);
        this.pull.splice(indexOfGoodElement, 1);
        return resultElement;
     }

    deconstruct(objects) { 
        this.pull.push(...objects);
    }

    getElement() {
        return new Object();
    }
    getGoodElements() { 
        return [];
    }
}