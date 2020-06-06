import React from 'react';
import { SlideUpDown } from '../simple-anime-lib';
import DemoPic from './demo-pic.jpg';
const SlideUpDownDemo = () => {
  return (
    <div className="demo-content">
      <div>
        <h3>
          This demo page show case the{' '}
          <SlideUpDown
            duration={1000}
            delay={2000}
            isInfiniteAnimation={true}
            easingStyle={'linear'}
            scale={1.9}
          >
            slide up and down
          </SlideUpDown>{' '}
          effect.
        </h3>
        <p>
          Simple animation library that have the following things. - Bounce - FadeIn and
          Out with easing effects - Slide up to limit and come back to original location -
          Pulse
        </p>
        <SlideUpDown
          duration={2000}
          delay={2000}
          isInfiniteAnimation={true}
          easingStyle={'linear'}
        >
          <img src={DemoPic} alt="effect demo"></img>
        </SlideUpDown>
      </div>
    </div>
  );
};

export default SlideUpDownDemo;
