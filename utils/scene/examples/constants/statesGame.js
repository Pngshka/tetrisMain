export const states = {
  loadingManifest: { nextState: "initialization" },
  initialization: { nextState: "initLevel" },
  initLevel: { nextState: "playing" },
  playing: { nextState: "null" },
}

export const ignoreNextStates = [
  "playing"
]
