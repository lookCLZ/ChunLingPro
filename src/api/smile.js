import axios from 'axios';
export function getSmile(page){
    const url='/getpagelist';
    const data={
    page,
}
    return axios.get(url,{
        params:data
    }).then((res)=>{
        return Promise.resolve(res.data);
    })
}
