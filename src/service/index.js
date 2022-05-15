import axios from 'axios';
import host from './host';

class Service {
  // fetch_api = (params, isSuccess, suburl = '/web/dataset/call_kw') => {
  //   // TODO: Dùng async await, không callback
  //   return new Promise(async (resolve, reject) => {
  //     var url = host + suburl;

  //     var result = await axios.post(url, params);

  //     if (isSuccess(result)) {
  //       resolve(result);
  //     } else {
  //       reject();
  //     }
  //   });
  // };

  post = (params, suburl = '/web/dataset/call_kw') => {
    return new Promise(async (resolve, reject) => {
      let url = host + suburl;
      let result = await axios.post(url, {params:params});
      if(result?.data?.result?? false){
        resolve({
          status: "success",
          data: result.data.result,
        })
      }
      else{
        resolve({
          status: "error",
          data: ""     // Tu bat ket qua
        })
      }
    });
  };
}

export default Service
