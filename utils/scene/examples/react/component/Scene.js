import {useDispatch} from "react-redux";
import {importControllerJS} from "../../../utils/helpers/import";
import {useEffect, useRef, useState} from "react";
import useStateReducer from "../../../react/hooks/useStateReducer";
import {ignoreNextStates} from "../../constants/states";
import {getNextState, onReady, requestState, useScene} from "../redux/reducer/scene";

export default function Scene() {
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const [scene, setScene] = useState();
  const {state} = useScene();

  useEffect(() => {
    importControllerJS().then(({default: Controller}) => {
      const scene = Controller.instance;

      setScene(scene);
      dispatch(onReady());
      scene.appendContainer(wrapperRef.current);
    });
  }, []);

  useStateReducer({},
    ignoreNextStates,
    state => dispatch(requestState(getNextState(state))),
    state,
    scene
  );

  return (
    <div className={"scene"}>
      <div className={"scene__wrapper"} ref={wrapperRef}/>
    </div>
  )
}