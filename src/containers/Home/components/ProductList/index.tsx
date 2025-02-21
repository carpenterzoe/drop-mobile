import { useProducts } from '@/services/product';
import { ErrorBlock, Grid } from 'antd-mobile';
import ProductCard from '../ProductCard';
import style from './index.module.less';

interface IProps {
  name: string; // 搜索的关键字
  type: string; // 商品分类
}

/**
* 商品列表
*/
const ProductList = (
  {
    name,
    type,
  }: IProps,
) => {
  const { data } = useProducts(name, type);
  if (data?.length === 0) {
    return <ErrorBlock status="empty" />;
  }
  return (
    <div className={style.container}>
      <Grid columns={2} gap={10}>
        {
          data?.map((item) => (
            <Grid.Item key={item.id}>
              <ProductCard data={item} />
            </Grid.Item>
          ))
        }
      </Grid>
    </div>
  );
};

export default ProductList;
