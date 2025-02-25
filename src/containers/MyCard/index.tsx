import { useCards } from '@/services/card';
import CardItem from './components/CardItem';
import style from './index.module.less';

/**
*   我的消费卡
*/
const MyCard = () => {
  const { data } = useCards();
  return (
    <div className={style.container}>
      {
        data?.map((item) => <CardItem key={item.id} data={item} />)
      }
    </div>
  );
};

export default MyCard;
