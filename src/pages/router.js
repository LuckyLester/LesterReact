import Loadable from 'react-loadable';
import Loading from '@/components/Loading';

const routes = [{
    path: '/',
    component:  Loadable({
        loader: () => import('./QuestionSuggest/Index'),
        loading: Loading
    })
}, {
    path: '/questionSuggest', // 问题建议
    component:  Loadable({
        loader: () => import('./QuestionSuggest/Index'),
        loading: Loading
    })
}, {
    path: '/questionDetail', // 问题建议详情
    component:  Loadable({
        loader: () => import('./QuestionDetail/Index'),
        loading: Loading
    })
}, {
    path: '/customerService', // 联系客服
    component:  Loadable({
        loader: () => import('./CustomerService/Index'),
        loading: Loading
    })
}, {
    path: '/deviceInfo', // 设备信息
    component:  Loadable({
        loader: () => import('./DeviceInfo/Index'),
        loading: Loading
    })
}, {
    path: '/solution', // 常见问题解决方案
    component:  Loadable({
        loader: () => import('./Solution/Index'),
        loading: Loading
    })
}];

export default routes




