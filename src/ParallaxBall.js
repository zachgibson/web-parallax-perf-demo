import React, { Component } from 'react';
import throttle from 'lodash.throttle';

import dribbbleBall from './ball.png';
import dribbbleBall2X from './ball-2x.png';

export default class extends Component {
    state = { show: true, elementHeight: null, topThreshold: null };

    shouldShow = throttle(() => {
        const { speed } = this.props;
        const { topThreshold } = this.state;

        if (window.scrollY > topThreshold / speed && this.state.show) {
            this.setState({ show: false });
        } else if (window.scrollY < topThreshold / speed && !this.state.show) {
            this.setState({ show: true });
        }
    }, 16);

    render() {
        const {
            speed,
            scrollY,
            transition = 'all 50ms ease-out',
            top,
            left
        } = this.props;
        const { topThreshold, elementHeight } = this.state;
        const windowHeight = window.innerHeight;

        if (elementHeight && !topThreshold) {
            const topThreshold = windowHeight * top + this.state.elementHeight;

            this.setState({ topThreshold }, () => {
                this.props.getThreshold(topThreshold / speed);
            });
        }

        if (topThreshold) {
            this.shouldShow();
        }

        return (
            <img
                alt="dribbble ball"
                ref={ref => {
                    if (
                        ref &&
                        ref.clientHeight !== 0 &&
                        this.state.elementHeight === null
                    ) {
                        this.setState({
                            elementHeight: ref.clientHeight
                        });
                    }
                }}
                src={dribbbleBall}
                srcSet={`${dribbbleBall2X} 2x`}
                style={{
                    position: 'fixed',
                    top: `${top * 100}%`,
                    left: `${left * 100}%`,
                    transform: `translate3d(0px, ${scrollY * speed}px, 0px)`,
                    transition,
                    willChange: 'transform'
                }}
            />
        );
    }
}
