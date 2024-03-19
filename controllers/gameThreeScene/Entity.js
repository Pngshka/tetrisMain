export default class Entity {
    components = [];
    //id - ???

    addComponent(component) {
        // Add component data to the entity
        this.components[component.name] = component;
        return this;
    }

    //removeComponent
}