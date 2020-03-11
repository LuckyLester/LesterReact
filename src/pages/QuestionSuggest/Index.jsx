import React from "react";
import {observer, inject} from "mobx-react";
import Mousetrap from 'mousetrap';
import qs from 'qs';


@inject(({base}) => ({
    base
}))
@observer
class Index extends React.Component {
    static displayName = 'QuestionSuggest';

    componentDidMount() {
        console.log(qs.parse(window.location.href));
        Mousetrap.bind('enter', () => {
            console.log('确定')
        });
        Mousetrap.bind('left', () => {
            console.log('left')
        });
        Mousetrap.bind('right', () => {
            console.log('right')
        });
        Mousetrap.bind('up', () => {
            console.log('up')
        });
        Mousetrap.bind('down', () => {
            console.log('down')
        });
        Mousetrap.bind('backspace', () => {
            console.log('backspace')
        });
    }

    render() {
        console.log(this.props, this.props.base.name);

        return (
            <div>
                问题建议
            </div>
        )
    }
}

export default Index
