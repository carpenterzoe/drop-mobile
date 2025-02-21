import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

// 每次请求时候携带token信息
const authLink = setContext((_, { headers }) => {
  // 发送请求之前添加Authorization属性
  // 获取到的token中携带用户的id信息
  const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }), // graphql 提供的缓存
});

export default client;
