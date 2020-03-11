import React from "react";
import {Provider} from "mobx-react";
import baseStore from './stores';

export default class extends React.Component {
    static displayName = 'Base';

    componentDidMount() {
        baseStore.getIp();
    }

    render() {
        const {children} = this.props;

        return (
            <div>
                <Provider base={baseStore}>
                    {children}
                </Provider>
            </div>
        )
    }
}
