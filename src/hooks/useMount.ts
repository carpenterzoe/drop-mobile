import { useEffect } from 'react';

/**
 * 组件加载时运行
 * @param fn
 */
const useMount = (fn: () => void) => {
  useEffect(() => {
    // fn 没有返回值，表示useEffect在初始化时执行；如果有return 则表示卸载时执行
    // 这里针对的是初始化的场景，所以 无返回
    fn?.();
  }, []);
};

export default useMount;
