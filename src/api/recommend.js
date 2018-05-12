import Axios from 'axios';
import {commonParams, options} from './config'

  export function getDescList(disstid) {
    const url = '/api/getDescList'
  
    const data = Object.assign({}, commonParams, {
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0
    })
  
    return Axios.get(url,{
      params:data
    }).then(res=>{
      return Promise.resolve(res.data);
    })
  }

  export function getRecommend() {
    const url = '/getrecommend'
  
    return Axios.get(url,{
    }).then(res=>{
      return Promise.resolve(res.data);
    })
  }

  export function getSwapper() {
    const url = '/setswapper'
  
    return Axios.get(url,{
    }).then(res=>{
      return Promise.resolve(res.data);
    })
  }
