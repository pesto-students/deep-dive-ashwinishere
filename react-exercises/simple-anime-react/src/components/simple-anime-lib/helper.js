import { useRef, useEffect, useCallback } from 'react';

const useAnimationFrame = ({
  delay,
  duration,
  timing,
  draw,
  iterationCount,
  callback,
}) => {
  const rafRef = useRef();
  const iterationCountRef = useRef(iterationCount - 1);
  const callbackRef = useRef(callback);
  const animate = useCallback(() => {
    let start = performance.now();
    rafRef.current = requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction >= 1) {
        if (iterationCountRef.current) {
          start = time;
          timeFraction = 0.0;
          iterationCountRef.current -= 1;
        }
        if (callbackRef.current) {
          callbackRef.current();
        }
      }
      const progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    });
  }, [duration, timing, draw]);

  useEffect(() => {
    setTimeout(
      () => animate({ duration, timing, draw, iterationCount }),
      delay
    );
    return () => {
      cancelAnimationFrame(rafRef.current);
      console.log('clean');
    };
  }, [animate, delay, duration, timing, draw, iterationCount]);
};

const timingFunction = {
  linear: function (timeFraction) {
    return timeFraction;
  },
  quad: function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
  },

  bounce: function bounce(timeFraction) {
    timeFraction = 1 - timeFraction;
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return (
          1 -
          (-1 * Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) +
            Math.pow(b, 2))
        );
      }
    }
  },
};

const getDelay = (userValue, defaultValue) => {
  const delay = userValue ? userValue : defaultValue;
  if (!(typeof delay === 'number')) {
    throw new Error(
      `Expected datatype of delay is number in millisecond, but provided ${typeof delay} type`
    );
  }
  return delay;
};

const getDuration = (userValue, defaultValue) => {
  const duration = userValue ? userValue : defaultValue;
  if (!(typeof duration === 'number')) {
    throw new Error(
      `Expected datatype of duration is number in millisecond, but provided ${typeof duration} type`
    );
  }
  return duration;
};

const getIterationCount = (userValue, defaultValue) => {
  const iterationCount = userValue ? userValue : defaultValue;
  if (!(typeof iterationCount === 'number')) {
    throw new Error(
      `Expected datatype of iterationCount is number, but provided ${typeof iterationCount} type`
    );
  }
  return iterationCount;
};

const getEasing = (userValue, defaultValue) => {
  const easing = userValue ? userValue : defaultValue;
  if (!(typeof easing === 'string')) {
    throw new Error(
      `Expected datatype of easing is string, but provided ${typeof easing} type`
    );
  }
  return easing;
};

const getDropHeight = (userValue, defaultValue) => {
  const dropHeight = userValue ? userValue : defaultValue;
  if (!(typeof dropHeight === 'number')) {
    throw new Error(
      `Expected datatype of dropHeight is number, but provided ${typeof dropHeight} type`
    );
  }
  return dropHeight;
};

const getMaxHeight = (userValue, defaultValue) => {
  const maxHeight = userValue ? userValue : defaultValue;
  if (!(typeof maxHeight === 'number')) {
    throw new Error(
      `Expected datatype of maxHeight is number, but provided ${typeof maxHeight} type`
    );
  }
  return maxHeight;
};

const getScale = (userValue, defaultValue) => {
  const scale = userValue ? Number(userValue) : defaultValue;
  if (!(typeof scale === 'number' && scale > 0)) {
    throw new Error(
      `Expected datatype of scale is number and it should be positive only,
       but provided ${typeof scale} type and value ${scale}`
    );
  }
  return scale;
};

const getCallback = (userCallback, defaultCallback) => {
  const callback = userCallback ? userCallback : defaultCallback;
  if (!(typeof callback === 'function' || callback === null)) {
    throw new Error(
      `Expected callback to be function type, but provided ${typeof userCallback} type`
    );
  }
  return callback;
};

export {
  useAnimationFrame,
  timingFunction,
  getDelay,
  getDuration,
  getDropHeight,
  getEasing,
  getIterationCount,
  getMaxHeight,
  getScale,
  getCallback,
};
