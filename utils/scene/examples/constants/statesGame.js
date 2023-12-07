export const states = {
  loadingManifest: { nextState: "initialization" },
  initialization: { nextState: "initLevel" },
  initLevel: { nextState: "playing" },
  playing: { nextState: "gameover" },
  gameover: { nextState: "null" },
  //playing: { nextState: "null" },
}

export const ignoreNextStates = [
  "playing",
  "gameover"
]
