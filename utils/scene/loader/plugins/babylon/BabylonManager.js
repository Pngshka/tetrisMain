import {LoadersManager} from "../LoadersManager";
import GLTFLoader from "./GLTFLoader";

export class BabylonManager extends LoadersManager {

  getLoader(assetData) {

    switch (assetData.type) {
      case "gltf":
        return GLTFLoader;
    }
  }
}

export const babylonManager = new BabylonManager();
