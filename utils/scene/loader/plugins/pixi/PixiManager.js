import {LoadersManager} from "../LoadersManager";
import TextureLoader from "./TextureLoader";

export class PixiManager extends LoadersManager {

  getLoader(assetData) {
    switch (assetData.type) {
      case "texture":
        return TextureLoader;
    }
  }
}

export const pixiManager = new PixiManager();
