import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/services/product';
import { useMemo } from 'react';
import Hr from '@/components/Hr';
import { Result } from 'antd-mobile';
import style from './index.module.less';
import BaseInfo from './components/BaseInfo';
import CourseInfo from './components/CourseInfo';
import BuyBottom from './components/BuyBottom';

/**
* 商品详情
*/
const ProductInfo = () => {
  const { id } = useParams();
  const { data } = useProductInfo(id || '');
  const courses = useMemo(() => {
    // 对象结构，id相同的重复数据会被覆盖，达到去重的目的
    const cs: Record<string, TCourse> = {};
    data?.cards?.forEach((item) => {
      cs[item.course.id] = {
        ...item.course,
        // 这里是将同一节课对应的所有消费卡，拼接到一起，用'/'符号分割
        cardName: cs[item.course.id] ? (`${cs[item.course.id].cardName} / ${item.name}`) : item.name,
      };
    });
    return Object.values(cs);
  }, [data?.cards]);

  if (!data) {
    return (
      <Result
        status="warning"
        title="提示"
        description="没有该商品信息"
      />
    );
  }
  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <Hr />
      <CourseInfo data={courses} />
      <BuyBottom data={data} />
    </div>
  );
};

export default ProductInfo;
