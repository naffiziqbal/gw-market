// debounce function

export function debounce(func, delay) {
  let timerId;
  return function (...arg) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, arg);
    }, delay);
  };
}
