import React from 'react';
import { Pulse } from '../simple-anime-lib';
import heartPic from '../../assets/images/heart.png';
const PulseDemo = () => {
  return (
    <div className="demo-content">
      <div>
        <h3>
          This demo page show case the{' '}
          <Pulse
            duration={1000}
            delay={2000}
            isInfiniteAnimation={true}
            easingStyle={'linear'}
            scale={1.9}
          >
            pulse
          </Pulse>{' '}
          effect.
        </h3>
        <p>
          Simple animation library that have the following things. - Bounce - FadeIn and
          Out with easing effects - Slide up to limit and come back to original location -
          Pulse
        </p>
        <Pulse
          duration={2000}
          delay={2000}
          isInfiniteAnimation={true}
          easingStyle={'linear'}
        >
          <img src={heartPic} alt="effect demo"></img>
        </Pulse>
      </div>
    </div>
  );
};

export default PulseDemo;
