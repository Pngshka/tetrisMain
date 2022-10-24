import {useEffect} from "react";

export default function useStateReducer(reducers = {}, ignoreNextStates = [], nextState, state, controller) {
  useEffect(() => {
    if (!controller) return;
    const controllerPromise = controller.eventBus.dispatchEvent({type: "apply-state", data: {state}})
    let ignorePromise = ignoreNextStates.indexOf(state) !== -1;

    if (typeof reducers[state] === "function")
      reducers[state](controllerPromise)

    if (!ignorePromise)
      controllerPromise.then(() => nextState(state));
  }, [state, controller]);
}
