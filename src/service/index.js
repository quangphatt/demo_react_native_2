import axios from 'axios';

import host from './host';

const fetch_api = (params,isSuccess, suburl = '/web/dataset/call_kw') => { // TODO: Dùng async await, không callback
  return new Promise(async (resolve, reject) => {
    var url = host + suburl;

    var result = await axios.post(url, params);
  
    if (isSuccess(result)) {
      resolve(result);
    } else {
      reject();
    }
  });
};

export default fetch_api;
