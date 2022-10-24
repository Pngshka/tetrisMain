let importPromise;

export function setImportPromise(promise) {
  importPromise = promise;
}

export async function importControllerJS() {
  return waitImportPromise().then(importPromise => importPromise);
}

function waitImportPromise() {
  return new Promise(resolve => {
    if (importPromise)
      resolve(importPromise);
    else {
      const interval = setInterval(() => {
        if (importPromise) {
          clearInterval(interval);
          resolve(importPromise);
        }

      }, 100);
    }
  })
}
