import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setImportPromise} from "../../../utils/helpers/import";
import Scene from "./Scene";

export default function SceneWrapper() {
  useEffect(() => {
    const promise =
      import("../../../pixi/pixi")
        .then(() => import("../../controller/PixiController"))
        .then(data => {
          const {default: PixiController} = data;
          PixiController.instance.init();
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
