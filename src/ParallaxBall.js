import React, { Component, Fragment } from "react";

import dribbbleBall from "./ball.png";

export default class extends Component {
  shouldComponentUpdate(props) {
    console.log(props.scrollY);
    return true;
  }

  render() {
    const {
      speed,
      scrollY,
      transition = "all 50ms ease-out",
      top,
      left
    } = this.props;
    const isInViewport = scrollY < window.innerHeight * 1.25;

    if (true) {
      return (
        <div
          ref={ref => {
            if (ref) {
              const element = window.getComputedStyle(ref, null);

              const transform =
                element.getPropertyValue("-webkit-transform") ||
                element.getPropertyValue("-moz-transform") ||
                element.getPropertyValue("-ms-transform") ||
                element.getPropertyValue("-o-transform") ||
                element.getPropertyValue("transform") ||
                "Either no transform set, or browser doesn't do getComputedStyle";

              // var lastIndex = str.lastIndexOf(" ");
              const gucci = transform
                .split("(")[1]
                .split(")")[0]
                .split(",");

              console.log(gucci[5]);

              // console.dir(ref);
            }
          }}
          style={{
            position: "fixed",
            top,
            left,
            // opacity: scrollY * 0.01,
            transform: `translate3d(0px, ${speed}px, 0px) rotate(${speed /
              2}deg) scale(${speed / 100})`,
            transition,
            willChange: "auto"
          }}
        >
          <img
            src={dribbbleBall}
            srcSet={`${dribbbleBall} 2x`}
            //  style={{ width: 104 }}
          />
        </div>
      );
    }

    return null;
  }
}
