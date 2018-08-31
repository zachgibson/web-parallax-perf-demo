import React, { Component, Fragment } from 'react';
import throttle from 'lodash.throttle';

import ShouldScroll from './ShouldScroll';
import ParallaxBall from './ParallaxBall';

const PARALLAX_BALLS = new Array(30).fill(1);

class Title extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { style } = this.props;
        return (
            <div
                style={{
                    height: '500vh',
                    marginTop: window.innerHeight / 2,
                    ...style
                }}
            >
                <h1>non-parallax element</h1>
            </div>
        );
    }
}

class App extends Component {
    state = { scrollY: 0 };

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = throttle(() => {
        window.requestAnimationFrame(() => {
            this.setState({ scrollY: window.scrollY });
        });
    }, 10);

    render() {
        const { scrollY } = this.state;

        return (
            <Fragment>
                <Title />
                {PARALLAX_BALLS.map((_, i) => (
                    <ShouldScroll>
                        {(setThreshold, injectedThreshold) => {
                            return (
                                <ParallaxBall
                                    key={`id-${i}`}
                                    scrollY={
                                        scrollY < injectedThreshold
                                            ? -scrollY
                                            : -injectedThreshold
                                    }
                                    speed={0.05 * (i + 1)}
                                    top={0.05 * (i + 1)}
                                    left={0.05 * (i + 1)}
                                    getThreshold={threshold => {
                                        if (!injectedThreshold) {
                                            setThreshold(Math.ceil(threshold));
                                        }
                                    }}
                                />
                            );
                        }}
                    </ShouldScroll>
                ))}
                <Title style={{ marginTop: '200vh' }} />
            </Fragment>
        );
    }
}

export default App;
