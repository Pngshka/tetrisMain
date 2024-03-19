
export default class SceneSystem{
    entity;

    constructor(entity){
        this.entity=entity;
        
        //console.log(this.entity.components.position.CAMERA)
        //this.scene = scene;
        //this.init();
    }

    init(){
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -this.entity.components.position.CAMERA,
                                                   window.innerWidth / this.entity.components.position.CAMERA,
                                                   window.innerHeight / this.entity.components.position.CAMERA,
                                                   window.innerHeight / --this.entity.components.position.CAMERA, 0.1, 1000);
        this.scene = new THREE.Scene();

        return this.camera, this.scene;
    }

    getScene(){
        return this.scene;
    }
}