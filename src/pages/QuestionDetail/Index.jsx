import React from "react";
import store from './stores';

export default class extends React.Component {
    static displayName = 'QuestionDetail';

    render() {

        return (
            <div onClick={() => {
                store.submit()
            }}>
                问题详情
            </div>
        )
    }
}
