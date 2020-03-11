import {action, observable} from "mobx";
import http from '@/utils/http';

class BaseStore {
    @observable name = 'long';
    @observable phone = '18820186926';

    @action change = () => {

    };

    async getIp() {
        const res =  await http.get('/v1/ip')
        console.log('ip地址..', res)
    }
}

export default new BaseStore();
