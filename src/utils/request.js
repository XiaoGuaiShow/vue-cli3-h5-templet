import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import {getToken} from '@/utils/auth'
import {Indicator, Toast} from 'mint-ui';

// axios 设置
axios.defaults.timeout = 5000; // 请求超时时间
axios.defaults.baseURL = process.env.VUE_APP_BASE_API; // url = base url + request url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // post请求头的设置

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error, 'err'); // for debug
        return Promise.reject(error)
    }
);

// 返回拦截器
axios.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        Indicator.close();
        const res = response.data;
        if (response.status === 200 && res.code === 0) {
            return Promise.resolve(res)
        } else {
            Toast({
                message: res.msg,
                position: 'middle',
                duration: 2000
            });
            if (res.code === 10001) {
                // 特定情况下，重新登录
                Toast('You have been logged out, you can cancel to stay on this page, or log in again');
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            }
            return Promise.reject(res)
        }
    },
    error => {
        Indicator.close();
        console.log('err' + error); // for debug
        const responseCode = error.response.status;
        switch (responseCode) {
            // 401：未登录
            case 401:
                break;
            // 404请求不存在
            case 404:
                Toast({
                    message: '网络请求不存在',
                    position: 'middle',
                    duration: 2000
                });
                break;
            default:
                Toast({
                    message: error.response.data.message,
                    position: 'middle',
                    duration: 2000
                });
        }
        return Promise.reject(error)
    }
);

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
    // 或者return axios.get();
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post (url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
    //  或者return axios.post();
}

export { get, post }
