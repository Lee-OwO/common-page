import axios from 'axios';

type method = 'post' | 'get' | 'delete' | 'put';
function initParams(method: method, apiData?: object) {
  let data = null;
  let params = null;
  if (method === 'get') {
    params = apiData;
  } else {
    data = apiData;
  }
  return { params, data };
}
function request(method: method, url: string, apiData?: object) {
  const { params, data } = initParams(method, apiData);
  return axios({
    method: method,
    url,
    data,
    params
  })
    .then(({ data: { code, data, msg } }) => {
      if (code === 200) {
        return data;
      } else {
        return Promise.reject(msg);
      }
    })
    .catch(e => {
      console.error(e);
    });
}

export const getApi = (url: string, params?: object) =>
  request('get', url, params);
export const postApi = (url: string, params: object) =>
  request('post', url, params);
export const delApi = (url: string, params: object) =>
  request('delete', url, params);
export const putApi = (url: string, params: object) =>
  request('put', url, params);
