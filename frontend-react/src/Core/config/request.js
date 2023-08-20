import axios from "axios";
import { localStorageAction } from "./localstorage.js";

axios.defaults.baseURL = "http://localhost:8000";

export const sendRequest = async ({
  method,
  route,
  body,
  includeHeaders = true,
  withCredentials = false,
  customHeaders = {}, 
}) => {
  if (!route) throw Error("URL required");

  axios.defaults.headers.authorization = includeHeaders
    ? `Bearer ${localStorageAction("token")}`
    : "";
  axios.defaults.withCredentials = withCredentials;

  Object.keys(customHeaders).forEach(header => {
    axios.defaults.headers[header] = customHeaders[header];
  });

  try {
    const response = await axios.request({
      method,
      url: route,
      data: body,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sendRequest;
