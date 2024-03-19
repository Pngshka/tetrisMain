import ThreeController from "../../utils/scene/containers/ThreeController";
import GameControllerTetris from "../../utils/scene/containers/controllers/Tetris/GameControllerTetris";
import initializationController from "../../utils/scene/controllers/input/inputController/initializationController"
import {
    BG_X,
    BG_Y,
    BG_Z,
    CAMERA,
    CAMERA_POS_Z, COL, CUBE_BG_X, CUBE_BG_Z,
    CUBE_GEOM, CUBE_POS, CUBE_POS_Z, ROW
} from "../../utils/scene/examples/constants/gameConstants";
import Loader from "../../utils/scene/loader/Loader";
import { threeManager } from "../../utils/scene/loader/plugins/threejs/ThreeManager";

import Entity from "./Entity";
import PositionComponent from "./components/PositionComponent";
import SceneSystem from "./SceneSystem";

Loader.registerManager(threeManager, "threejs");

export default class Controller extends ThreeController {
    entities = []; 
    entity;
    systems = [];
//---------------------------------------------------

    renderer;

    camera;

    scene;

    dpr;

    data;

    rollingGroundSphere;

    async loadingManifestSelect() {
        const response = await fetch('/assets/tetrisAssets.json');
        this.data = await response.json();
    }

    initializationSelect() {
        this.entity = new Entity();
        this.entity.addComponent(new PositionComponent());

        this.systems.push(new SceneSystem(this.entity));
        // this.scene = this.initScene();
        // this.camera = this.initCamera();


        // this.dpr = window.devicePixelRatio;

        // this.initializationScene();



        // this.onResize();

        // this.PositionComponentFirst = new PositionComponent;
        // this.PositionComponentSecond = new PositionComponent;
        // this.PositionComponentSecond.x = 2423434;
        // console.log(this.PositionComponentFirst.x)
        // console.log(this.PositionComponentSecond.x)

        // this.runAnimation();
    }

    initializationScene() {
        window.addEventListener('resize', this.onResize)

        this.renderer.setClearColor(this.data.colors[5]);


        this.camera.position.z = CAMERA_POS_Z;

        var sphereGeometry = new THREE.DodecahedronGeometry(3, 2, 2);
        //var sphereMaterial = this.initMeshBasicMaterial(this.data.colors[6]);
        var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x447474, flatShading: true });
        sphereMaterial.roughness = 0;
        sphereMaterial.metalness = 0.4;

        this.rollingGroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // this.rollingGroundSphere.receiveShadow = true;
        // this.rollingGroundSphere.castShadow = true;
        // debugger
        this.rollingGroundSphere.position.x = 0;
        this.rollingGroundSphere.position.y = -4; //0.3
    }

    initLevelSelect() {
    }

    playingSelect() {

    }

    runAnimation=()=>{
        setTimeout(() => {
            requestAnimationFrame(this.runAnimation);
        }, 300);
        this.scene.clear();

        var hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, .9)
        this.scene.add(hemisphereLight);
        let sun = new THREE.DirectionalLight(0xffffff, 4.9);
        sun.position.set(2, 6, -7);
        sun.castShadow = true;
        this.scene.add(sun);
        //Set up shadow properties for the sun light
        sun.shadow.mapSize.width = 256;
        sun.shadow.mapSize.height = 256;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 50;

        this.rollingGroundSphere.rotation.x += 100;
        console.log(213213)
        this.scene.add(this.rollingGroundSphere);

        this.renderer.render(this.scene, this.camera);

        
    }

    remove() {
        this.scene.clear();
        this.renderer.render(this.scene, this.camera);
    }

    initCamera() { 
        return new THREE.OrthographicCamera(window.innerWidth / -CAMERA, window.innerWidth / CAMERA, window.innerHeight / CAMERA, window.innerHeight / -CAMERA, 0.1, 1000);
    }


    onResize() {
        // super();
        if (!this.camera) return
        this.dpr = window.devicePixelRatio;


        const { renderer: { domElement } } = this;
        if (!domElement.parentNode) return;

        const { offsetWidth, offsetHeight } = domElement.parentNode;
        this.camera.left = offsetWidth / -CAMERA;
        this.camera.right = offsetWidth / CAMERA;
        this.camera.top = offsetHeight / CAMERA;
        this.camera.bottom = offsetHeight / -CAMERA;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(offsetWidth * this.dpr, offsetHeight * this.dpr);
        this.renderer.domElement.style.width = offsetWidth + 'px';
        this.renderer.domElement.style.height = offsetHeight + 'px';
        this.renderer.render(this.scene, this.camera);
    }
}
