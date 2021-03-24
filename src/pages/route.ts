/**
 * @Author lester
 * @Date 2020-07-17
 */

import Loadable from '@/utils/loadable';

export default [{
  path: '/index',
  component: Loadable(() => import('src/pages/Index/Index'))
}]
