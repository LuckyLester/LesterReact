import Axios from 'axios';

Axios.defaults.baseURL = 'http://feedback-t.api.leiniao.com/feedbackapi/';
Axios.defaults.timeout = 2000;


const get = (url, param) => {
    return new Promise((resolve, reject) => {
        Axios.get(url, {
            params: {
                ...param
            }
        }).then(res => {
            if(res.status === 200) {
                resolve({
                    ...res.data
                })
            } else {
                reject(res.statusText || '请求错误')
            }
        }).catch(err => {
            reject(err)
        })
    })
};

const post = async (url, param) => {
    return new Promise((resolve, reject) => {
        Axios.post(url, {
            ...param
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }).then(res => {
            if(res.status === 200) {
                resolve({
                    ...res.data
                })
            } else {
                reject(res.statusText || '请求错误')
            }
        }).catch(err => {
            reject(err)
        })
    })
};

export default {
    get,
    post
}
