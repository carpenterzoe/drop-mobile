import {
  getRouteByKey, routes,
} from '@/routes/menus';
import { useEffect, useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []); // ‌空依赖项数组，在组件初始化时执行
};

// 通用页面跳转器
export const useGoTo = () => {
  const nav = useNavigate();
  const back = () => nav(-1);
  const go = (
    pageKey?: string,
    params?: Record<string, string | number>,
  ) => {
    // 无key 跳转首页
    if (!pageKey) {
      nav('/'); // eslint忽然不能标红&自动fix，把插件卸载重装，再重启vscode 解决。
      return;
    }

    const route = getRouteByKey(pageKey);
    if (route) {
      // 纯跳转，无参数
      if (!params) {
        nav(`/${route.path}`); // 如果直接传 pathname，没有斜杠，会变成相对地址 比如 /home/my
        return;
      }

      // /page/:id params: { id: 1 } => /page/1
      const url = route.path.replace(
        /\/:(\w+)/g,
        (exp: string, exp1: string) => `/${params[exp1]}`,
      );
      nav(`/${url}`);
    }
  };
  return { back, go };
};

// 通过页面的url 匹配查找，返回我们自己定义的路由配置信息
export const useMatchedRoute = () => {
  // 拿到当前路由，react 提供
  const r = useLocation();

  /**
   * 到路由配置中查找匹配
   *
   * useMemo 不让该函数执行次数过多？
   * ? 所以这里引发一个疑问，useMemo 究竟适合于什么样的场景能做到优化？
   * ? 怎么才能判断确实有优化， 这个钩子有没有常见的滥用 引发的副作用
   */
  const route = useMemo(() => routes.find((item) => matchPath(`/${item.path}`, r.pathname)), [r.pathname]);
  return route;
};
