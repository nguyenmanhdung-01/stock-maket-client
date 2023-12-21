import axios from "axios";
import { getTokenInfo } from "../auth/auth";

const baseURL = process.env.REACT_APP_STOCK;
const instance = axios.create({
  baseURL: baseURL,
  mode: "no-cors",
});

const initHeader = { isAuth: true };

export const getAccessToken = async () => {
  const tokenInfo = await getTokenInfo();
  if (tokenInfo) {
    return tokenInfo?.accessToken;
  }
  return null;
};

export const getHeader = async (customHeaders) => {
  const header = customHeaders || {};
  const initCustomHeader = customHeaders ? customHeaders : initHeader;
  if (!initCustomHeader?.isAuth) {
    delete header.Authorization;
  } else {
    const authToken = await getAccessToken();
    header.Authorization = `Bearer ${authToken}`;
  }
  return { ...header };
};

async function fetch(url, params, customHeaders, responseType) {
  const headers = await getHeader(customHeaders);
  return instance.get(url, { params, headers, responseType });
}

async function post(url, data, customHeaders) {
  const headers = await getHeader(customHeaders);
  return instance.post(url, { ...data }, { headers });
}

async function postForm(url, data, customHeaders) {
  const headers = await getHeader(customHeaders);
  return instance.post(url, data, { headers });
}

async function put(url, data, customHeaders) {
  const headers = await getHeader(customHeaders);
  return instance.put(url, { ...data }, { headers });
}

async function remove(url, data, customHeaders) {
  const headers = await getHeader(customHeaders);
  return instance.delete(url, { data: { ...data }, headers: { ...headers } });
}

const ApiUtils = { fetch, post, put, postForm, remove };
export default ApiUtils;
