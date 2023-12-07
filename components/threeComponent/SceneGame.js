import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ignoreNextStates, states } from "../../utils/scene/examples/constants/statesGame";
import useStateReducer from "../../utils/scene/react/hooks/useStateReducer";
import { useLoadController } from "../../utils/scene/react/hooks/useLoadController";
import { baseThreeImports } from "../../utils/scene/utils/import/import-three";
import { getNextState } from "../../utils/scene/utils/state/state";
import CustForm from "../login/CustForm";

export default function SceneGame() {
  const wrapperRef = useRef();
  const [wrapper, setWrapper] = useState();
  const [state, setState] = useState("loadingManifest");

  useLoadController({
    getLibsPromise: baseThreeImports,
    getWrapperPromise: () => import(`../../controllers/gameThreeScene/Wrapper`),
    beforeInit: ({ wrapper }) => setWrapper(wrapper),
  });

  useEffect(() => {
    if (!wrapper) return;
    wrapper.appendContainer(wrapperRef.current);
  }, [wrapper]);


  useStateReducer({

  }, ignoreNextStates, state => {
    (async () => {
      await wrapper.controller[`${state}`]?.();
    })().then(()=>{setState(getNextState(states, state))});
  }, state, wrapper);


  return (
    <div className={"scene"}>
      <div className={"game__wrapper"} ref={wrapperRef} id={"div"}>
        <CustForm/>
      </div>
    </div>
  );
}
