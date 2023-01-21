import { useState, useEffect, useRef } from "react";

export function formatHM(date) {
    return [date.getUTCHours(), date.getUTCMinutes()].map(x => x.toString().padStart(2, '0')).join(':');
}
export function formatHMS(date) {
    return [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].map(x => x.toString().padStart(2, '0')).join(':');
}
export function formatTimeUntil(ms) {
    const time = new Date(ms);
    const hour = time.getUTCHours();
    const min = time.getUTCMinutes();
    const sec = time.getUTCSeconds();
    let text = '';
    if (hour !== 0) {
        text = hour + 'hr';
    }
    text += min + 'min';
    if (hour === 0 && min === 0) {
        text = sec + 's';
    }
    return text;
}
export function formatLocalTime(date) {
    const hours = date.getHours();
    return `${hours === 0 ? '12' : hours >= 12 ? hours - 12 : hours}:${date.getMinutes().toString().padStart(2, '0')}${hours < 12 ? 'a' : 'p'}m`;
}

export function hrs(num) {
    return 1000 * 60 * 60 * num;
}

// 1 second real time = 7 seconds tarkov time
const tarkovRatio = 7;

export function realTimeToTarkovTime(time, left) {
    // tarkov time moves at 7 seconds per second.
    // surprisingly, 00:00:00 does not equal unix 0... but it equals unix 10,800,000.
    // Which is 3 hours. What's also +3? Yep, St. Petersburg - MSK: UTC+3.
    // therefore, to convert real time to tarkov time,
    // tarkov time = (real time * 7 % 24 hr) + 3 hour

    const oneDay = hrs(24);
    const russia = hrs(3);

    const offset = russia + (left ? 0 : hrs(12));
    const tarkovTime = new Date((offset + (time.getTime() * tarkovRatio)) % oneDay);
    return tarkovTime;
}

export function timeUntilRelative(until, left, date) {
    const tarkovTime = realTimeToTarkovTime(date, left);
    if (until < tarkovTime.getTime()) until += hrs(24);

    const diffTarkov = until - tarkovTime.getTime();
    const diffRT = diffTarkov / tarkovRatio;

    return diffRT;
}

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const classNameGenerator = (...classes) => {
    return classes.join(" ");
}

export function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
  }
