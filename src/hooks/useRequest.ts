import { useCallback, useState } from 'react';
import useMount from './useMount';

/**
 * interface 和 type
 * 1. interface用于新声明一些类型，type用于给已有的类型起个别名，比如联合类型
 * 2. 在不知道用哪个时，用 interface
 */
interface IOptions {
  params: Record<string, string>,
  manual?: boolean,
  onSuccess?: (res: unknown) => void,
  onError?: (err: unknown) => void,
}

/**
 * 组件初始化，发送请求获取数据
 * @param service 请求fn
 * @param params 请求参数
 * @returns
 */
const useRequest = (
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IOptions,
) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>();

  // 公共方法 既可以手动触发，也可以初始化时执行
  // useCallback 防止 init方法 在每次组件update时都重新创建
  // 只有依赖的 service 更新时，才重新创建
  const init = useCallback(
    (curParams: Record<string, string>) => {
      setLoading(true);

      // 这里 return 是为了外部调用 init时，可以直接 .then
      return service(curParams).then((res) => {
        setData(res);
        if (options.onSuccess) {
          options.onSuccess(res);
        }
      })
        .catch((err) => {
          options.onError?.(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [service],
  );

  // 初始化时执行
  useMount(() => {
    if (!options.manual) {
      init(options.params);
    }
  });

  // 手动触发
  // init 在箭头函数后面直接 return，init返回是 promise，这样外部调用时，可以直接 .then
  const run = (runParams: Record<string, string>) => init(runParams);
  // 所以现在 外部调用时，既可以传 onSuccess, onError, 也可以 .then

  return { loading, data, run };
};
export default useRequest;
