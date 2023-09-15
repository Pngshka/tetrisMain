import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {ignoreNextStates, states} from "../../constants/states";
import useStateReducer from "../../utils/scene/react/hooks/useStateReducer";
import {useLoadController} from "../../utils/scene/react/hooks/useLoadController";
import {baseThreeImports} from "../../utils/scene/utils/import/import-three";
import {getNextState} from "../../utils/scene/utils/state/state";

export default function Scene() {
  const wrapperRef = useRef();
  const [wrapper, setWrapper] = useState();
  const [state, setState] = useState("loadManifest");

  useLoadController({
    getLibsPromise: baseThreeImports,
    getWrapperPromise: () => import(`../../controllers/quickStartThreeScene/Wrapper`),
    beforeInit: ({wrapper}) => setWrapper(wrapper),
  });

  useEffect(() => {
    if (!wrapper) return;
    wrapper.appendContainer(wrapperRef.current);
  }, [wrapper]);

  useStateReducer({}, ignoreNextStates, state => setState(getNextState(states, state)), state, wrapper);

  return (
    <div className={"scene"}>
      <div className={"scene__wrapper"} ref={wrapperRef}/>
    </div>
  );
}
