import { GET_PRODUCT_TYPES, GET_PRODUCTS } from '@/graphql/product';
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from '@/utils/constants';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect } from 'react';

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};

export const useProducts = (
  name = '',
  type = '',
) => {
  // 调get拿到的值，会被useLazyQuery自动放到data里，不需要自己手动set值
  // 可以看到return并未返回请求方法，只返回了data，外面也拿到了值
  const [get, { data }] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);

  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: '加载中...',
    });
    const res = await get({
      fetchPolicy: 'network-only', // 设置该接口不走缓存
      variables: {
        name,
        type: type === DEFAULT_TYPE ? '' : type,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
    });
    toast.close();
    return res;
  };

  useEffect(() => {
    init();
  }, [name, type]);

  return {
    data: data?.getProductsForH5.data,
  };
};
