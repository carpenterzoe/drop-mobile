import { Space, Tag } from 'antd-mobile';
import { CARD_STATUS, CARD_TYPE, DAY_FORMAT } from '@/utils/constants';
import classNames from 'classnames';
import { BankcardOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import style from './index.module.less';

interface IProps {
  data: ICardRecord
}

/**
*   当前用户拥有的消费卡
*/
const CardItem = ({
  data,
}:IProps) => (
  <div className={style.container}>
    <div
      className={classNames({
        [style.itemContainer]: true,
        [style.expired]: data.status === CARD_STATUS.EXPIRED,
        [style.deplete]: data.status === CARD_STATUS.DEPLETE,
      })}
    >
      <Space justify="between" className={style.top}>
        <span>
          <BankcardOutline />
          <span className={style.name}>
            {data.card.name}
          </span>
        </span>
        {
          data.card.type === CARD_TYPE.TIME[0] && (
            <Tag color="#fff" fill="outline">
              {CARD_TYPE.TIME[1]}
              (余
              {data.residueTime}
              )
            </Tag>
          )
        }
        {
          data.card.type === CARD_TYPE.DURATION[0] && (
            <Tag color="warning" fill="outline">
              {CARD_TYPE.DURATION[1]}
            </Tag>
          )
        }
      </Space>
      <Space justify="between" className={style.bottom}>
        <span>{data.org.name}</span>
        <span>
          有效期到：
          {dayjs(data.endTime).format(DAY_FORMAT)}
        </span>
      </Space>
    </div>
  </div>
);

export default CardItem;
