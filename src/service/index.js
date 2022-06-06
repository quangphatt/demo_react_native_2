import axios from 'axios';
import host from './host';

class Service {
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
