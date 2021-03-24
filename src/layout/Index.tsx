/**
 * @Author lester
 * @Date 2020-11-12
 */

import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route, RouteProps, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import routes from 'src/pages/route';
import useModel from "flooks";
import state from "src/store";
import { queryUserInfo } from 'src/api';
import './style.less';

const Routes = withRouter(({location}) => (
  <TransitionGroup className="transition-wrap">
    <CSSTransition
      timeout={300}
      classNames={'fade'}
      key={location.pathname}
    >
      <Switch location={location}>
        {
          routes.map((item: RouteProps) => (
            <Route key={`rt${item.path}`} {...item} exact/>
          ))
        }
        <Redirect from="/*" to="/index"/>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

const Layout: React.FC = () => {
  const { setUserInfo, getMemberInfo, getAccountInfo } = useModel(state, []);

  const getUserInfo = async () => {
    const res:any = await queryUserInfo({ refer: window.location.href });
    if (res) {
      const { redirectUrl, user } = res;
      if (redirectUrl) {
        window.location.replace(redirectUrl);
      } else if (user) {
        setUserInfo(user);
        window.localStorage.setItem('userInfo', JSON.stringify(user));
        getMemberInfo();
        getAccountInfo();
      }
    }
  };

  useEffect(() => {
    // getUserInfo();
    /*const userInfo: any = window.localStorage.getItem('userInfo');
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
      getMemberInfo();
      getAccountInfo();
    } else {
      getUserInfo();
    }*/
  }, []);

  return (
    <Router>
      <Routes/>
    </Router>
  )
};

export default Layout;
