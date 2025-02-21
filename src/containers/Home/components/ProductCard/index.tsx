import { Image } from 'antd-mobile';
import style from './index.module.less';

interface IProps {
  data: IProduct
}

/**
* 商品卡片
*/
const ProductCard = ({
  data,
}: IProps) => {
  console.log('data', data);
  return (
    <div className={style.container}>
      <Image
        src={data.coverUrl}
        className={style.img}
      />
      <div className={style.info}>
        <div className={style.name}>
          {data.name}
        </div>
        {/* 点击门店查看门店详情 */}
        <div className={style.org}>
          <span className={style.orgName}>
            {data.org.name}
          </span>
          <span className={style.distance}>
            {data.distance || '未知'}
          </span>
        </div>

        <div className={style.price}>
          <span className={style.preferentialPrice}>
            ¥
            {data.preferentialPrice}
          </span>
          <span className={style.originalPrice}>
            ¥
            {data.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
