import ThreeController from "../../utils/scene/containers/ThreeController";
import { InputController } from '../../utils/scene/containers/controllers/counter/input-controller';
import { KeyboardPlugin } from '../../utils/scene/containers/controllers/counter/plugins/KeyboardPlugin';
import { ActivWithKeyCode } from '../../utils/scene/containers/controllers/counter/plugins/ActivWithKeyCode.js';
import GameControllerTetris from "../../utils/scene/containers/controllers/counter/Tetris/GameControllerTetris";
import {CubeFactory} from "../../utils/scene/containers/controllers/counter/Tetris/CubeFactory";
// import * as THREE from "three";
import {
  BG_X,
  BG_Y,
  BG_Z,
  CAMERA,
  CAMERA_POS_Z, COL, CUBE_BG_X, CUBE_BG_Z,
  CUBE_GEOM, CUBE_POS, ROW
} from "../../utils/scene/containers/controllers/counter/gameConstants";
import Loader from "../../utils/scene/loader/Loader";
import {threeManager} from "../../utils/scene/loader/plugins/threejs/ThreeManager";

Loader.registerManager(threeManager, "threejs");

export default class Controller extends ThreeController {
  cubes= [];
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
    factoryF;

  async loadingManifest() {
    const response = await fetch('/assets/tetrisAssets.json');
    this.data = await response.json();

    console.log(this.data)
    // debugger
  }

  initialization() {

    this.gameControllerTetris = new GameControllerTetris(this, this.data);
    this.initializationKeyCode();

    this.scene = new THREE.Scene();
    this.camera = this.initCamera();

    // console.log(this.data)
    this.material = new THREE.MeshBasicMaterial({ color: this.data.colors[4] });
    this.materialF = new THREE.MeshBasicMaterial({ color: this.data.colors[4] });
    this.materialB = new THREE.MeshBasicMaterial({ color: this.data.colors[6] });

    this.geometry = new THREE.BoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);

    const figure = new THREE.Mesh(this.geometry, this.material);

    this.geometryB = new THREE.BoxGeometry(BG_X, BG_Y, BG_Z);
    this.cubeB = new THREE.Mesh(this.geometryB, this.materialB);

    this.factory = new CubeFactory();
    this.onResize = this.onResize.bind(this);
    // this.data = data;
    this.dpr = window.devicePixelRatio;

    this.initializationScene();
  }

  initializationScene() {
    window.addEventListener('resize', this.onResize)

    // debugger
    this.container = document.getElementById('div');

    // this.container.appendChild(this.renderer);

    this.renderer.setClearColor(this.data.colors[5]);
    // this.onResize();


    this.camera.position.z = CAMERA_POS_Z;
    this.cubeB.position.z = CUBE_BG_Z;
    this.cubeB.position.x = CUBE_BG_X;

  }

  initLevel() {
  }

  playing() {

  }

  initializationKeyCode(){
    const topAktiv = new ActivWithKeyCode("top", true, [38]);
    const leftAktiv = new ActivWithKeyCode("left", true, [37, 65]);
    const rightAktiv = new ActivWithKeyCode("right", true, [39, 68]);
    const downAktiv = new ActivWithKeyCode("down", true, [40]);

    const inputController = new InputController();

    const keyboardPlugin = new KeyboardPlugin(inputController, this.gameControllerTetris);

    inputController.addPlugin(keyboardPlugin);

    inputController.bindActions(topAktiv);
    inputController.bindActions(leftAktiv);
    inputController.bindActions(rightAktiv);
    inputController.bindActions(downAktiv);

    inputController.attach(document);
  }

  runAnimation(matrix, figure, positionFigureY, positionFigureX, color) {

    // console.log("FFFFFFFF");

    this.scene.clear();
    //статичная фигура
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        if (matrix[i][j]) {
          const cube = this.factory.construct( this.material);
          cube.position.x = j * CUBE_GEOM - CUBE_POS;
          cube.position.y = -(i * CUBE_GEOM - CUBE_POS);

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
          cube.position.y = -((positionFigureY + row) * CUBE_GEOM - CUBE_POS);

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

  // onResize() {
  //   this.dpr = window.devicePixelRatio;
  
  //   const {renderer:{domElement}} = this;
  //   const {offsetWidth, offsetHeight} = domElement.parentNode;
  //   this.camera.left = offsetWidth / -CAMERA;
  //   this.camera.right = offsetWidth / CAMERA;
  //   this.camera.top = offsetHeight / CAMERA;
  //   this.camera.bottom =offsetHeight/ -CAMERA;
  //   this.camera.updateProjectionMatrix();
  
  //   this.renderer.setSize(offsetWidth* this.dpr, offsetHeight * this.dpr);
  //   this.renderer.domElement.style.width=offsetWidth +'px';
  //   this.renderer.domElement.style.height=offsetHeight +'px';
  //   console.log( this.renderer.domElement.style.height)
  //   this.renderer.render(this.scene, this.camera);
  // }

}