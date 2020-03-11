import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import routers from '@/pages/router';
import Base from './Base';
import style from './style.module.less';

function Layout() {

    return (
        <div className={style.layout}>
            <Base>
                <HashRouter>
                    <Switch>
                        {
                            routers.map((route, index) => (
                                <Route key={`route${index}`} exact {...route} />
                            ))
                        }
                        <Redirect from="/*" to="/" />
                    </Switch>
                </HashRouter>
            </Base>
        </div>
    )
}

export default Layout
