import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setImportPromise} from "../../../utils/helpers/import";
import Scene from "./Scene";

export default function SceneWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const promise =
      import("../../../three/three.jsm")
        .then(() => import("../../controller/Controller"))
        .then(data => {
          const {default: Controller} = data;
          Controller.instance.init();
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
