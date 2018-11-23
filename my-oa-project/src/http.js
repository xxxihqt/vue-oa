import axios from 'axios';
import { Loading, Message } from 'element-ui';

let loading;
function startLoading(){
    loading=Loading.service({
        lock:true,
        text:'拼命加载中...',
        background:'rbga(0,0,0,0.7)',
    });
}

function closeLoading(){
    loading && loading.close();
}


  
//请求拦截
axios.interceptors.request.use(config=>{
    console.log('start')
    startLoading();
    return config;
},error=>{
    return Promise.reject(error);
})

//响应拦截
axios.interceptors.response.use(response=>{
    console.log(response)

    closeLoading();
    return response;

},error=>{
    closeLoading();
    Message.error(error.response.data);
    return Promise.reject(error);
})

export default axios;