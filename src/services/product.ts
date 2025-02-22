import { GET_PRODUCT_TYPES, GET_PRODUCTS, GET_PRODUCTS_BY_ORG_ID } from '@/graphql/product';
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from '@/utils/constants';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect, useState, useRef } from 'react';

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};

// 获取当前定位
const getPosition = () => new Promise<{ latitude: number; longitude: number }>((r) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    r({ latitude, longitude });
  }, () => {
    r({ latitude: 0, longitude: 0 });
  }, {
    timeout: 3000, // 请求接口的超时时间
    maximumAge: 30 * 60 * 1000, // 设置半个小时
  });
});

// 首页商品卡片列表
export const useProducts = (
  name = '',
  type = '',
) => {
  // 调get拿到的值，会被useLazyQuery自动放到data里，不需要自己手动set值
  // 可以看到return并未返回请求方法，只返回了data，外面也拿到了值
  // 但如果要对data进行二次处理，还是需要重新set
  const [get] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);

  const [data, setData] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const curPage = useRef(1); // 不需要在页面响应式的数据 可以useRef

  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: '加载中...',
    });

    const {
      latitude,
      longitude,
    } = await getPosition();
    const res = await get({
      fetchPolicy: 'network-only', // 设置该接口不走缓存
      variables: {
        name,
        type: type === DEFAULT_TYPE ? '' : type,
        longitude,
        latitude,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
    });
    toast.close();
    return res.data?.getProductsForH5.data || [];
  };

  const onRefreshHandler = async () => {
    curPage.current = 1;
    setHasMore(true);
    const res = await init();
    setData(res);
  };

  const onLoadMoreHandler = async () => {
    const res = await init(curPage.current + 1);
    if (res.length > 0) {
      curPage.current += 1;
      setData((old) => [...old, ...res]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    onRefreshHandler();
  }, [name, type]);

  return {
    data,
    onRefresh: onRefreshHandler,
    loadMore: onLoadMoreHandler,
    hasMore,
  };
};

// 门店详情 - 推荐商品
export const useProductsByOrgId = (orgId: string) => {
  const { data } = useQuery<TProductsQuery>(
    GET_PRODUCTS_BY_ORG_ID,
    {
      variables: {
        orgId,
      },
    },
  );

  return data?.getProductsByOrgIdForH5.data;
};
