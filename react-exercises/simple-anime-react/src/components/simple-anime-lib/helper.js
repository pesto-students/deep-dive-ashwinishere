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
  if (!(typeof userValue === 'number')) {
    throw new Error(
      `Expected datatype of delay is number in millisecond, but provided ${typeof userValue} type`
    );
  }
  const delay = userValue ? userValue : defaultValue;
  return delay;
};

const getDuration = (userValue, defaultValue) => {
  if (!(typeof userValue === 'number')) {
    throw new Error(
      `Expected datatype of duration is number in millisecond, but provided ${typeof userValue} type`
    );
  }

  const duration = userValue ? userValue : defaultValue;
  return duration;
};

const getIterationCount = (userValue, defaultValue) => {
  if (!(typeof userValue === 'number')) {
    throw new Error(
      `Expected datatype of iterationCount is number, but provided ${typeof userValue} type`
    );
  }

  const iterationCount = userValue ? userValue : defaultValue;
  return iterationCount;
};

const getEasing = (userValue, defaultValue) => {
  if (!(typeof userValue === 'string')) {
    throw new Error(
      `Expected datatype of easing is string, but provided ${typeof userValue} type`
    );
  }
  const easing = userValue ? userValue : defaultValue;
  return easing;
};

const getDropHeight = (userValue, defaultValue) => {
  if (!(typeof userValue === 'number')) {
    throw new Error(
      `Expected datatype of dropHeight is number, but provided ${typeof userValue} type`
    );
  }
  const dropHeight = userValue ? userValue : defaultValue;
  return dropHeight;
};

const getMaxHeight = (userValue, defaultValue) => {
  if (!(typeof userValue === 'number')) {
    throw new Error(
      `Expected datatype of maxHeight is number, but provided ${typeof userValue} type`
    );
  }
  const maxHeight = userValue ? userValue : defaultValue;
  return maxHeight;
};

const getScale = (userValue, defaultValue) => {
  if (!(typeof userValue === 'number' && userValue > 0)) {
    throw new Error(
      `Expected datatype of scale is number and it should be positive only, but provided ${typeof userValue} type`
    );
  }
  const scale = userValue ? Number(userValue) : defaultValue;
  return scale;
};

const getCallback = (userCallback, defaultCallback) => {
  if (!(typeof userCallback === 'function')) {
    throw new Error(
      `Expected callback to be function type, but provided ${typeof userCallback} type`
    );
  }
  const callback = userCallback ? userCallback : defaultCallback;
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
