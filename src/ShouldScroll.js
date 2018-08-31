import React, { Component } from 'react';

export default class extends Component {
    state = { threshold: null };

    setThreshold = threshold => {
        if (!this.state.threshold) {
            this.setState({ threshold });
        }
    };

    render() {
        const { children } = this.props;

        return children(this.setThreshold, this.state.threshold);
    }
}
