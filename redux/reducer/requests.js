import RequestsBuilder from "../../utils/redux/RequestsBuilder";
import {profile, setResult} from "../../api/user";


const builder = new RequestsBuilder({
  name: "requests",
  initialState: {},
  reducers: {
    clearError(state, {payload: {field, requestName} = {}}) {

      if (!field) return;
      requestName = builder.getRequestByName(requestName);

      const requestData = state.requests[`requests/${requestName}`];
      if (!requestData?.error?.fields?.[field]) return;

      delete requestData.error.fields[field];

      if (!Object.keys(requestData.error.fields).length)
        requestData.error = null;
    }
  }
})
  .addRequest({
    requestName: "user/profile",
    extraName: "profile",
    checkLocal: true,
    func: profile
  })
  .addRequest({
    requestName: "setResult",
    extraName: "setResult",
    checkLocal: true,
    func: setResult
  })


builder.create();

const requests = builder.export();

export default requests;

/**
 * Хук для получения статуса запроса.
 * @param requestName [String] `request/${requestName}`
 * @returns requestData [{local:{currentRequestId, error, state}, global:{currentRequestId, error, state}}]
 */
export const {useRequestData} = requests.selectors;
