export function debounce(delay: number, fn: Function) {
    let timerId:NodeJS.Timeout|null;
    return function (...args: any[]) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }