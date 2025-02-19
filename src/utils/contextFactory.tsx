/**
 * 首先回忆一下该context核心是抽象，提供一个工厂，用于创建不同的context
 * context的要素有些什么？
 *
 * provider
 * defaultStore
 * context
 */

import {
  createContext, useContext, useMemo, useState,
} from 'react';

interface IStore<T> {
  key: string,
  store: T,
  setStore: () => void,
}

// ? 2. ctx 的provider怎么取， 怎么包裹子组件
// function getProvider<T>(ctx: React.Context<T>) {
//   const provider = ctx.Provider;
//   return provider;
// }

/**
 * * getCxtProvider 本质上是将 Context.Provider 相关的重复动作的统一封装，包括：
 *  1. store 处理成响应式；
 *  2. 统一处理要传给 Provider 的 value；
 *  3. Context.Provider 包裹子组件。
 *
 * 1. 入参 key, defaultValue, AppContext;
 *    key & defaultValue 用来处理到 <AppContext.Provider value={value}>；
 *    AppContext 用来取  <AppContext.Provider></AppContext.Provider> 包裹器。
 *
 * 2. 返回值是一个 函数组件，该函数组件接收一个子组件作为参数，将子组件用 Context.Provider 包裹。
 *
 * ? 所以 1. 为什么必须返回一个函数？- 返回的是函数组件 2. 这个函数怎么被外部调用 - 参考connetcFactory
 */
function getCxtProvider<T>(
  key: string,
  defaultValue: T,
  AppContext: React.Context<IStore<T>>,
) {
  // IPropChild 用于描述组件，指定了一个 children 属性，并且该children是一个 React.ReactNode;
  return ({ children }: IPropChild) => {
    const [store, setStore] = useState(defaultValue);
    const value = useMemo(() => ({
      key,
      store,
      setStore: (payload = {}) => setStore((state) => ({ // setState 参数传递更新函数，以拿到最新的state
        ...state, // 增量更新，避免setStore时把已有的值覆盖
        ...payload,
      })),
    }), [store]);

    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };
}

// ? 1. cache 是这样吗，指定 value Ctx<any>
// * any不放在这里，而是定义Ctx时，class Ctx<T = any>
// const cxtCache:Record<string, Ctx<any>> = {};
const cxtCache:Record<string, Ctx> = {};

// ? 1. Ctx 是这三个要素吗
// * 是的，但是我的类型定义 和示例代码出入较大，再看下这部分类型使用。
class Ctx<T = any> {
  defaultStore: IStore<T>;

  AppContext: React.Context<IStore<T>>;

  // provider: Provider<T>;
  // * 可以看到这里定义的 Provider 是一个函数，入参为子组件，返回一个被 Provider 包裹的组件
  Provider: ({ children }: IPropChild) => JSX.Element;

  constructor(key: string, defaultValue: T) {
    // this.defaultStore = value;
    // * defaultStore 存了3个东西，key, store, setStore
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    };

    // this.AppContext = createContext(defaultValue);
    // 不只是把 defaultValue 存下来，key, store, setStore 都要存
    this.AppContext = createContext<IStore<T>>(this.defaultStore);

    // ! 2. provider 相关的最不确定
    // this.Provider = getProvider<T>(this.AppContext);

    // * 创建Provider, Provide 用来包裹组件, 使组件可以访问上下文中的数据和方法
    this.Provider = getCxtProvider<T>(key, defaultValue, this.AppContext);

    cxtCache[key] = this; // 1. * 缓存context
  }
}

// ? 3. connectFactory 应该返回什么？ 被 provider 包裹的子组件？ - 是的，返回一个组件包裹器（自己本身也是一个函数组件）
// ? 3. 那 new Ctx 的逻辑 到哪里去执行 - new 也是在这执行

// ? 3. 如果我在 connectFactory 接收一个要被 Provider 包裹的子组件，入参怎么定义
// ! 这里并不实际接收子组件，而是只接收 key, defaultValue, 用于初始化；
// ! 返回一个组件包裹器，让外部调用方去传子组件。
export function connectFactory1<T>(key:string, value: T) {
  if (cxtCache[key]) {
    return cxtCache[key];
  }
  const AppContext = new Ctx(key, value);
  // ! 这里返回Cxt实例是没有任何意义的，这个实例上有3个属性 defaultStore, AppContext, Provider
  // ! 而我们在connect动作中用到的只有 Provider
  return AppContext;
}

export function connectFactory<T>(key: string, defaultValue: T) {
  const ctx = cxtCache[key];

  let CurCtx: Ctx;
  if (ctx) {
    CurCtx = ctx;
  } else {
    CurCtx = new Ctx(key, defaultValue);
  }

  // return ((Child) => (
  //   <CurCtx.Provider>
  //     <Child />
  //   </CurCtx.Provider>
  // ));
  // ! connectFactory 返回一个高阶组件（HOC），这个 HOC 接收一个 Child 组件作为参数。
  return ((Child: React.FunctionComponent<any>) => (props: any) => (
    /* eslint-disable react/jsx-props-no-spreading */
    <CurCtx.Provider>
      <Child {...props} />
    </CurCtx.Provider>
  ));
}

// ? 4. useContext 的执行结果是这样直接返回吗，还是说要再封装些什么
// * useContext 返回的是整个store, 我们定义的 IStore 中，外部只需要用到 store & setStore，所以返回值进一步封装。
export const useAppContext = (key: string) => {
  const ctxInstance = cxtCache[key];
  // return useContext(ctxInstance.AppContext);
  const app = useContext(ctxInstance.AppContext);
  return {
    store: app.store,
    setStore: app.setStore,
  };
};

/**
 * 可以看到对这一块的模糊，主要分为4块：
 *
 * 1. context 初始化。【简单】done
 * 2. Provider 相关各种处理。【不熟悉】done
 * 3. connectFactory 应该包含些什么。【不熟悉】TODO: 暂时不能百分百理解串联起来，尤其是多层调用，子组件嵌套，HOC相关。暂时搁置。
 * 4. useAppContext 封装。【简单】done
 * 5. 泛型使用
 */

/**
 * * 1. class Ctx 做的事情：context 初始化
 *  a. 定义 defaultStore, AppContext, Provider，其中 defaultStore 不只是 value，还有 key，以及修改value的函数。
 *  b. 构造函数中初始化这3个变量
 *  c. 缓存构造函数new的实例
 */

/**
 * * 2. getCxtProvider 本质上是将 Context.Provider 相关的重复动作的统一封装，包括：
 *  1. store 处理成响应式；
 *  2. 统一处理要传给 Provider 的 value；
 *  3. Context.Provider 包裹子组件。返回包裹好的新组件。
 */
