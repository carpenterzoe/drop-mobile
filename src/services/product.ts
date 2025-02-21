import { GET_PRODUCT_TYPES, GET_PRODUCTS } from '@/graphql/product';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};

export const useProducts = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  type = '',
) => {
  // 调get拿到的值，会被useLazyQuery自动放到data里，不需要自己手动set值
  // 可以看到return并未返回请求方法，只返回了data，外面也拿到了值
  const [get, { data }] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);

  useEffect(() => {
    get({
      variables: {
        type,
        page: {
          pageNum,
          pageSize,
        },
      },
    });
  }, []);

  return {
    data: data?.getProductsForH5.data,
  };
};
