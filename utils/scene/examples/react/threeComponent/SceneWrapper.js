import {useEffect} from "react";
import {setImportPromise} from "../../../utils/helpers/import";
import Scene from "./Scene";

export default function SceneWrapper() {
  useEffect(() => {
    const promise =
      import("../../../three/three.jsm")
        .then(() => import("../../controller/ThreeController"))
        .then(data => {
          const {default: ThreeController} = data;
          ThreeController.instance.init();
          return data;
        })

    setImportPromise(promise);
  }, [])

  return (
    <div>
      <Scene/>
    </div>
  )
}
