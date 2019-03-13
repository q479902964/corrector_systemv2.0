import axios from 'axios'
import config from '@/config/config.js'


/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */

class Ajax {
  axios(method,url,params){
    return new Promise((resolse,reject)=>{
      if(typeof params !== "object") params = {};
      let axiosConfig = {};
      axiosConfig = {
        url,
        method,
        // baseURL:process.env.API_HOST,
        timeout:30000,
        params: null,
        data: null,
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
        },
        withCredentials: false,
        validateStatus:(status)=>{
          return status >= 200 && status < 300;
        },
        // transformRequest: [function (data) {
        //   // 对 data 进行任意转换处理
        //   let formData = new FormData();
        //   for(let key in data){
        //     formData.append(key,data[key])
        //   }
        //   return formData;
        // }],
        ...params
      }
      axios.request(axiosConfig)
        .then(res=>{
          var data = typeof res.data === "object" ? res.data : JSON.parse(res.data);
          resolse(res);
        },err=>{
          if(err.response){
            reject(err.response);
          }else{
            reject(err);
          }
        })
    })
  }

  axiosForm(method,url,params,type){
    return new Promise((resolse,reject)=>{
      if(typeof params !== "object") params = {};
      let axiosConfig = {};
      axiosConfig = {
        url,
        method,
        // baseURL:"http://120.77.8.210/api2.0",
        timeout:30000,
        params: null,
        data: null,
        headers: {
          'Content-Type': type?'multipart/form-data':'application/x-www-form-urlencoded',
        },
        withCredentials: false,
        validateStatus:(status)=>{
          return status >= 200 && status < 300;
        },
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          let formData = new FormData();
          for(let key in data){
            formData.append(key,data[key])
          }
          return formData;
        }],
        ...params
      }
      axios.request(axiosConfig)
        .then(res=>{
          var data = typeof res.data === "object" ? res.data : JSON.parse(res.data);
          resolse(res);
        },err=>{
          if(err.response){
            reject(err.response);
          }else{
            reject(err);
          }
        })
    })
  }
}

export default Ajax