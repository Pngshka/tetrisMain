import axios from "axios";
import ApiError from "./ApiError";

const prefix = "";

function isAbsolute(str) {
  return /^(\w+:)?\/\//.test(str);
}

function hasPrefix(method, prefix) {
  return prefix && method.indexOf(prefix) === 0;
}

function getURL(method) {
  if (isAbsolute(method) || hasPrefix(method, prefix)) {
    return method;
  }

  return `${prefix}${method}`;
}

function initMethod(method) {
  return (apiMethod, data = {}) => {
    // console.log(method, apiMethod, data)
    send({method, apiMethod, data})
  };
}

let globalHeaders = {};

export function addHeaders(_headers) {
  Object.keys(_headers)
    .forEach(key => {
      if (key === false) {
        delete globalHeaders[key];
      } else {
        globalHeaders[key] = _headers[key];
      }
    })
}

export const get = initMethod("get");
export const post = initMethod("post");

export function send({apiMethod, ...params}) {
// debugger
  return axios({
    ...params,
    headers: {
      ...globalHeaders,
      ...params?.headers,
    },
    url: getURL(apiMethod)
  })
    .then(async (response) => {
      if (apiMethod==="setResult") {
        const form = document.querySelector('.login')
        form.reset();
        form.style.display = 'none';

        fetch('getResult').then(async (response) => {
          let str = "";
          const div = document.querySelector('.div')
          div.style.display = 'block';

          let data = await response.json()
          console.log(data)
          for (let i = 0; i < ((data.length < 10) ? data.length : 10); i++) {
            str += ("<br>" + `${data[i].name}` + ": " + `${data[i].score}` + "</br>")
          }
          div.innerHTML = str
        });
      }
    })
}

/**
 *
 * @param {{data, status, statusText, headers, config}} response
 * @return {*}
 */
function onSuccess(response) {
  const {data} = response;

  console.log(response)

  if (ApiError.isError(data)) {
    throw ApiError.fromApiResponse(data);
  }
  return data.data;
}

function onFail(error) {
  // console.log(error)
  if (error.response && typeof error.response.data === "object") {
    throw ApiError.fromApiResponse(error.response.data);
  } else if (error.request) {
    throw ApiError.fromHttpError(error.request);
  } else {
    throw new ApiError({});
  }
}
