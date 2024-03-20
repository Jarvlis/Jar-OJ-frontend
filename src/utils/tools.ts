import message from "@arco-design/web-vue/es/message";

export function throttle(callback: (...args: any[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]): void => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, delay);
    } else {
      message.error("请间隔一段时间再提交");
    }
  };
}

export function debounce(callback: (...args: any[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]): void => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}
