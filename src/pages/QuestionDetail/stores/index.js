import {observable} from "mobx";
import http from '@/utils/http';

class BaseStore {
    @observable deviceInfo = 'long';

    async submit() {
        const res =  await http.post('/v1/feedback', {
            clientType: '',
            dnum: '',
            sysVersion: '',
            launchVersion: '',
            mac: '',
            ip: '114.119.117.175',
            questionId: 1,
            question: '功能操作-不知道如何进入机顶盒内容'
        });
        console.log('提交..', res)
    }
}

export default new BaseStore();
