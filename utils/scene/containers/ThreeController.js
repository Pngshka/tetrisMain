import Stats from "stats.js";
import {getIsDebug} from "../debug/getIsDebug";
import ThreeScene from "./ThreeScene";
import {exportGLTF} from "../utils/export/exportGLTF";
import SceneController from "./SceneController";
import Loader from "../loader/Loader";
import {threeManager} from "../loader/plugins/threejs/ThreeManager";
import ThreeParser from "../loader/plugins/postprocessing/ThreeParser";
import FPSMeter, {fpsMeter} from "../utils/fps-meter/fps-meter";

Loader.registerManager(threeManager, "threejs");

export default class ThreeController extends SceneController {

  debug = getIsDebug();

  clock = new THREE.Clock();

  stats;

  sceneSettings;

  rendererSettings;

  scenes = {};

  cameras = {};

  currentScene = null;

  currentCamera = null;

  constructor(data) {
    super(data);
    this.sceneSettings = data.scene;
    this.rendererSettings = data.renderer;

    this.onDecreaseStepChange = this.onDecreaseStepChange.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  loadingSelect() {
    if (this.storage.createBefore)
      ThreeParser.createObjectsFromParams(this.storage.createBefore, {
        scene: this.scene
      });

    return Loader.load(this.storage.preload, {
      onLoad: this.onLoad, externalData: {
        scene: this.scene
      }
    })
  }

  onDecreaseStepChange(step) {
  }

  onLoad() {
  }

  init() {
    if (this.debug)
      this.initStats();

    this.initRenderer();
    this.initScenes();
    this.initCameras();

    if (this.container)
      this.appendContainer(this.container);
  }

  create() {

    this.initItems();

    if (getIsDebug())
      this.initDebug();

    if (this.storage.sceneOverrides)
      ThreeParser.overrideObjects(this.scene,
        this.storage.sceneOverrides,
        {
          scene: this.scene
        });

    FPSMeter.listen(this.onDecreaseStepChange);
    fpsMeter.start();
    requestAnimationFrame(this.update);
  }

  initDebug() {

  }

  initCameras() {
    const {
      storage: {
        mainSceneSettings: {
          camera: cameraSettings,
        } = {}
      }
    } = this;
    this.currentCamera = this.cameras.main = this.initCamera(cameraSettings);
  }

  initCamera(cameraSettings = {}) {
    return new THREE.PerspectiveCamera(cameraSettings.fov ?? 30, cameraSettings.aspect || window.innerWidth / window.innerHeight, 0.1, cameraSettings.far || 10000);
  }

  initScenes() {
    this.currentScene = this.scenes.main = this.initScene("main");

    if (typeof window.__THREE_DEVTOOLS__ !== 'undefined') {
      window.__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', {detail: this.currentScene}));
      window.__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', {detail: this.renderer}));
    }
  }

  initScene() {
    const {
      storage,
      eventBus,
      storage: {
        mainSceneSettings: {
          fog,
        } = {}
      },
      sceneSettings: {
        Cls = ThreeScene,
        options = {}
      } = {}
    } = this;

    return new Cls({eventBus, storage, fog, ...options})
  }

  initRenderer() {
    const {
      storage: {
        mainSceneSettings: {
          shadow,
          backgroundColor: sBackgroundColor,
        } = {}
      },
      rendererSettings: {
        backgroundColor = sBackgroundColor || "#cccccc",
        devicePixelRatio = window.devicePixelRatio,
        options = {antialias: true, logarithmicDepthBuffer: true}
      } = {}
    } = this;

    const renderer = this.renderer = new THREE.WebGLRenderer(options);
    renderer.setClearColor(backgroundColor);
    renderer.setPixelRatio(devicePixelRatio);

    if (shadow) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
    }
  }

  appendContainer(container) {
    if (this.renderer) {
      container.innerHTML = "";
      container.appendChild(this.renderer.domElement);
    }

    super.appendContainer(container);
  }

  get canvas() {
    return this.renderer?.domElement;
  }

  onResize({width, height}) {
    if (!this.renderer.domElement.parentElement) return;
    const {renderer} = this;

    Object.values(this.cameras).forEach(camera => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    Object.values(this.scenes).forEach(scene => scene.resize(width, height));

    renderer.setSize(width, height);
  }

  initStats() {
    const stats = this.stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
  }

  exportGLTF(params) {
    return exportGLTF(this.currentScene, params)
  }

  update() {
    if (this.stats) this.stats.end();
    const {clock, currentScene, currentCamera, renderer} = this;
    const delta = clock.getDelta();

    currentScene.update(delta);

    renderer.render(currentScene, currentCamera);

    if (this.stats) this.stats.begin();

    return delta;
  }
}
