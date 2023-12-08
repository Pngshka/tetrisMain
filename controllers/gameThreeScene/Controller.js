import ThreeController from "../../utils/scene/containers/ThreeController";
import GameControllerTetris from "../../utils/scene/containers/controllers/Tetris/GameControllerTetris";
import {CubeFactory} from "../../utils/scene/containers/controllers/Tetris/CubeFactory";
import initializationController from "../../utils/scene/controllers/input/inputController/initializationController"
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';
import {
    BG_X,
    BG_Y,
    BG_Z,
    CAMERA,
    CAMERA_POS_Z, COL, CUBE_BG_X, CUBE_BG_Z,
    CUBE_GEOM, CUBE_POS, CUBE_POS_Z, ROW
} from "../../utils/scene/examples/constants/gameConstants";
import Loader from "../../utils/scene/loader/Loader";
import {threeManager} from "../../utils/scene/loader/plugins/threejs/ThreeManager";
import CustForm from "../../components/login/CustForm";

Loader.registerManager(threeManager, "threejs");

export default class Controller extends ThreeController {
    cubes = [];

    cubesF = [];

    cubeB;

    renderer;

    camera;

    container;

    scene;

    geometry;

    material;

    materialF;

    materialB;

    dpr;

    data;

    factory;

    async loadingManifestSelect() {
        const response = await fetch('/assets/tetrisAssets.json');
        this.data = await response.json();
    }

    initializationSelect() {

        this.gameControllerTetris = new GameControllerTetris(this, this.data);
        initializationController(this.gameControllerTetris);

        this.scene = this.initScene();
        this.camera = this.initCamera();

        this.material = this.initMeshBasicMaterial(this.data.colors[4]);
        this.materialF = this.initMeshBasicMaterial(this.data.colors[4]);
        this.materialB = this.initMeshBasicMaterial(this.data.colors[6]);

        this.geometry = this.initBoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);
        this.geometryB = this.initBoxGeometry(BG_X, BG_Y, BG_Z);

        const figure = this.initMesh(this.geometry, this.material);
        this.cubeB = this.initMesh(this.geometryB, this.materialB);

        this.factory = new CubeFactory();
        this.dpr = window.devicePixelRatio;

        this.initializationScene();

        this.onResize();
    }

    initializationScene() {
        window.addEventListener('resize', this.onResize)

        this.renderer.setClearColor(this.data.colors[5]);


        this.camera.position.z = CAMERA_POS_Z;
        this.cubeB.position.z = CUBE_BG_Z;
        this.cubeB.position.x = CUBE_BG_X;

    }

    initLevelSelect() {
    }

    playingSelect() {

    }

    runAnimation(matrix, figure, positionFigureY, positionFigureX, color) {
        this.scene.clear();
        //статичная фигура
        for (let i = 0; i < ROW; i++) {
            for (let j = 0; j < COL; j++) {
                if (matrix[i][j]) {
                    const cube = this.factory.construct(this.material);
                    cube.position.x = j * CUBE_GEOM - CUBE_POS;
                    cube.position.y = -(i * CUBE_GEOM - CUBE_POS + window.innerHeight / CUBE_POS_Z);

                    this.cubes.push(cube);
                    this.scene.add(cube);
                }
            }
        }

        // debugger
        this.factory.deconstruct(this.cubes);
        this.cubes.splice(0, this.cubes.length);
        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col]) {
                    if (positionFigureY + row < 0) {
                        break;
                    }

                    const cube = this.factory.construct(this.materialF);
                    cube.material.color.set(`${color}`);

                    cube.position.x = (positionFigureX + col) * CUBE_GEOM - CUBE_POS;
                    cube.position.y = -((positionFigureY + row) * CUBE_GEOM - CUBE_POS + window.innerHeight / CUBE_POS_Z); //0.3
                    // console.log(window.innerHeight)

                    this.cubesF.push(cube);
                    this.scene.add(cube);
                }
            }
        }

        this.factory.deconstruct(this.cubes);
        this.cubes.splice(0, this.cubes.length);

        this.scene.add(this.cubeB);
        this.renderer.render(this.scene, this.camera);
    }

    remove() {
        this.scene.clear();
        this.renderer.render(this.scene, this.camera);
    }

    initCamera() { //cameraSettings = {}
        return new THREE.OrthographicCamera(window.innerWidth / -CAMERA, window.innerWidth / CAMERA, window.innerHeight / CAMERA, window.innerHeight / -CAMERA, 0.1, 1000);
    }


    onResize() {
        // super();
        if (!this.camera) return
        this.dpr = window.devicePixelRatio;


        const {renderer: {domElement}} = this;
        if (!domElement.parentNode) return;

        const {offsetWidth, offsetHeight} = domElement.parentNode;
        this.camera.left = offsetWidth / -CAMERA;
        this.camera.right = offsetWidth / CAMERA;
        this.camera.top = offsetHeight / CAMERA;
        this.camera.bottom = offsetHeight / -CAMERA;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(offsetWidth * this.dpr, offsetHeight * this.dpr);
        this.renderer.domElement.style.width = offsetWidth + 'px';
        this.renderer.domElement.style.height = offsetHeight + 'px';
        // console.log( this.renderer.domElement.style.height)
        this.renderer.render(this.scene, this.camera);
    }
}
