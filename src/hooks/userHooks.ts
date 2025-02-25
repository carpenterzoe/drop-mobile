import { GET_STUDENT_INFO } from '@/graphql/user';
import { connectFactory, useAppContext } from '@/utils/contextFactory';
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 可以看到这里的分层处理逻辑很清晰，跟 contextFactory 区分开来，只专注于用户store的处理
 *
 * userHooks
 * 1. 初始化用户数据，获取成功，则更新store，失败 重定向登录
 * 2. 返回Provider包裹的子组件，让子组件都能拿到 user store
 * 3. 向外暴露 useUserContext，提供读取store，setStore的方法
 */

const KEY = 'studentInfo';
const DEFAULT_VALUE = {};

// 获取用户store，setStore
export const useUserContext = () => useAppContext(KEY);

// Provider包裹子组件
export const connect = connectFactory(KEY, DEFAULT_VALUE);

// 初始化时，请求用户信息 & 存store，或请求失败拦截登录
export const useGetStudent = () => {
  const { setStore } = useUserContext();
  const location = useLocation();
  const nav = useNavigate();
  const { loading, refetch } = useQuery<{ getStudentInfo: { data: IStudent } }>(GET_STUDENT_INFO, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.getStudentInfo) {
        const {
          id, name, tel, desc, avatar, openid,
        } = data.getStudentInfo.data;
        setStore({
          id, name, tel, desc, avatar, refetchHandler: refetch, openid,
        });
        // 确保登录之后，不再跳转到登录页面
        if (location.pathname.startsWith('/login')) {
          nav('/');
        }
        return;
      }
      // 用户没有登录要返回登录界面
      // 防止token没有拿到后，页面重复刷新跳转登陆页面
      setStore({ refetchHandler: refetch });
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        nav(`/login?orgUrl=${window.location.pathname}`);
      }
    },
    onError: () => {
      setStore({ refetchHandler: refetch });
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        nav(`/login?orgUrl=${window.location.pathname}`);
      }
    },
  });
  return { loading };
};
