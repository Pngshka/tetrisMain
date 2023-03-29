import {useEffect} from "react";
import Scene from "./Scene";
import {setImportPromise} from "../../utils/scene/utils/helpers/import";

export default function SceneWrapper() {
  useEffect(() => {
    const promise =
      import("../../utils/scene/three/three.jsm")
        .then(() => import("../../controllers/customThreeScene/CustomThreeWrapper"))
        .then(data => {
          const {default: CustomThreeWrapper} = data;
          CustomThreeWrapper.instance.init();
          return data;
        });

    setImportPromise(promise);
  }, []);

  return (<Scene/>);
}
