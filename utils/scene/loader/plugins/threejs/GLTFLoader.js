import BaseLoader from "../BaseLoader";

export default class GLTFLoader extends BaseLoader {

  static name = "ThreeGLTFLoader"

  constructor(manager) {
    super(manager);
    this.checkParser = this.checkParser.bind(this);
  }

  checkParser(settings, parser) {
    parser.beforeRoot = this.getBeforeRoot(parser.beforeRoot, parser, settings);
    return {
      name: "checkParser",
      parser
    }
  }

  getBeforeRoot(baseCallBack, parser, settings) {
    const {path} = settings;

    return () => {
      const texturesPromises = parser.json.textures
        .filter(textureDef => {
          const sourceIndex = textureDef.source;
          const sourceDef = parser.json.images[sourceIndex];

          return !!sourceDef.uri
        })
        .map((textureDef, index) => {
          const sourceIndex = textureDef.source;
          const sourceDef = parser.json.images[sourceIndex];
          const cacheKey = (sourceDef.uri || sourceDef.bufferView) + ':' + textureDef.sampler;

          const promise = this.loadTexture(`${path}${sourceDef.uri}`).then(texture => {
            parser.textureCache[cacheKey] = texture;
            return texture;
          });

          parser.cache.add(`texture:${index}`, promise)

          return promise;
        });

      return Promise.all([baseCallBack?.call(parser), ...texturesPromises]);
    }
  }

  loadTexture(url) {

    return new Promise(resolve => {
      const loader = new THREE.TextureLoader();
      loader.load(
        this.manager.resolveURL(url),
        resolve
      );
    });
  }

  load(settings) {
    const {path, fileName} = settings;
    const loader = new THREE.GLTFLoader(this.manager)
    const url = this.manager.resolveURL(`${path}${fileName}`);

    super.load(url);

    loader.pluginCallbacks.push(this.checkParser.bind(this, settings));

    loader.load(url, (data) => {
      data.scene.animations = data.animations;
      this.onLoad(settings, data.scene)
    })
  }
}
