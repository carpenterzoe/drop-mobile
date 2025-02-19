import { GET_PRODUCT_TYPES } from '@/graphql/product';
import { useQuery } from '@apollo/client';

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};
