import * as THREE from 'three'
import { CUBE_GEOM } from '../../../examples/constants/gameConstants.js'
import { AbstractFactory } from './AbstractFactory.js';

export class CubeFactory extends AbstractFactory {
    getElement() {
        const geometry = new THREE.BoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);
        //const material = arguments[0];
        const material = new THREE.MeshBasicMaterial();
        return new THREE.Mesh(geometry, material);
    }

    getGoodElements() {
        const material = this.args[0];
        //console.log(material);
        return this.pull.filter(x => x.material.color.r === material.color.r &&
            x.material.color.g === material.color.g &&
            x.material.color.b === material.color.b);
    }
}
