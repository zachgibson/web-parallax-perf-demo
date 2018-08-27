import React, { Component, Fragment } from "react";
import throttle from "lodash.throttle";

import ParallaxBall from "./ParallaxBall";

class App extends Component {
  state = { scrollY: 0 };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  onScroll = throttle(() => {
    window.requestAnimationFrame(() => {
      this.setState({ scrollY: window.scrollY });
    });
  }, 8);

  render() {
    const { scrollY } = this.state;

    return (
      <div style={{ height: 3000 }}>
        <ParallaxBall
          scrollY={scrollY}
          speed={scrollY * 0.75}
          top={80}
          left={80}
        />
      </div>
    );
  }
}

export default App;
