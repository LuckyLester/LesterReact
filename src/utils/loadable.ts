/**
 * @Author lester
 * @Date 2020-07-17
 */

import RouteLoadable from 'react-loadable';
import { Loading } from '@/components';

export default (loader: () => any) => {
  return RouteLoadable({
    loading: Loading,
    loader
  })
}

