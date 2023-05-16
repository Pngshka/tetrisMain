export default class BaseDecorator {

  define(target, property, get, set) {
    const attributes = {get, set};

    if (Object.hasOwn(target, property)) return;
    Object.defineProperty(target, property, attributes)
  }
}
