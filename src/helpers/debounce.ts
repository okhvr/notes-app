export function debounce(delay: number, fn: (...args: any[]) => void) {
    let timerId: NodeJS.Timeout | null;
    return (...args: any[]) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    };
  }
