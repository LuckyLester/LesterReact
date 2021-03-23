/**
 * @Author lester
 * @Date 2020-07-17
 */

import Loadable from '@/utils/loadable';

export default [{
  path: '/index',
  component: Loadable(() => import('src/pages/Index/Index'))
}, {
  path: '/rule',
  component: Loadable(() => import('src/pages/Rule/Index'))
}, {
  path: '/userCenter',
  component: Loadable(() => import('src/pages/UserCenter/Index'))
}, {
  path: '/openRecord',
  component: Loadable(() => import('src/pages/OpenRecord/Index'))
}, {
  path: '/memberInfo',
  component: Loadable(() => import('src/pages/MemberInfo/Index'))
}, {
  path: '/chooseMember',
  component: Loadable(() => import('src/pages/ChooseMember/Index'))
}]
