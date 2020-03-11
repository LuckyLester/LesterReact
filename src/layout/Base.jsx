import React from "react";

export default class extends React.Component {
    static displayName = 'Base';

    render() {
        const {children} = this.props;

        return (
            <div>
                {children}
            </div>
        )
    }
}
