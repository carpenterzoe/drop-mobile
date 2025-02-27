import { Grid, Image } from 'antd-mobile';
import Hr from '@/components/Hr';
import style from './index.module.less';

interface IProps {
  data: IProduct
}

/**
*  基础信息
*/
const BaseInfo = ({
  data,
}: IProps) => (
  <div className={style.container}>
    <div className={style.headerContainer}>
      <Image
        src={data.bannerUrl}
        alt=""
        className={style.image}
      />
      <div className={style.title}>{data.name}</div>
      <div className={style.desc}>{data.desc}</div>
    </div>
    <Hr />
    <Grid columns={3} gap={8} className={style.sale}>
      <Grid.Item>
        剩余库存：
        {data.stock}
      </Grid.Item>
      <Grid.Item>
        每人限购：
        {data.limitBuyNumber}
      </Grid.Item>
      <Grid.Item>
        已售：
        {data.buyNumber || 0}
      </Grid.Item>
    </Grid>
  </div>
);

export default BaseInfo;
