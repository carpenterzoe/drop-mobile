import {
  Button, Divider,
  Selector,
  Tabs,
  Toast,
} from 'antd-mobile';
import { useSchedulesByCourse } from '@/services/schedule';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getWeekZh } from '@/utils';
import { useUseCards } from '@/services/card';
import style from './index.module.less';

interface IProps {
  courseId: string;
  onClose: () => void;
}

/**
*   预约课程弹窗
*   可以选择课程表和消费卡
*/
const SubscribePopup = ({
  courseId,
  onClose,
}: IProps) => {
  const { data: schedules } = useSchedulesByCourse(courseId);
  const [selectSchedule, setSelectSchedule] = useState<string[]>([]);

  const { data: cards } = useUseCards(courseId); // 获取该课程下的消费卡
  console.log('cards: ', cards);

  const weeks = useMemo(() => {
    const w = [];
    // 获取未来七天的日期
    for (let i = 1; i < 8; i += 1) {
      const day = dayjs().add(i, 'day'); // 未来七天的日期
      const week = getWeekZh(day.format('dddd')); // 未来七天日期，转为中文的周几

      // schedules 是根据课程id获取的课程表，这里筛出未来七天中循环item某一天的课程表
      const times = schedules?.filter((item) => day.isSame(item.schoolDay, 'day'));
      const orderTimes = times?.map((item) => ({
        label: `${item.startTime.slice(0, 5)}-${item.endTime.slice(0, 5)}`, // 可约时间 时间段
        value: item.id,
      }));
      w.push({
        weekLabel: week, // 中文周几 展示用
        weekValue: day.format('dddd'), // 英文的周几
        orderTimes,
      });
    }

    return w;
  }, [schedules]);

  const subscribeHandler = async () => {
    console.log('selectSchedule', selectSchedule);
    // || selectCard.length === 0
    if (selectSchedule.length === 0) {
      Toast.show({
        content: '请选择对应的上课时间和消费卡',
      });
    }

    onClose();
  };
  return (
    <div className={style.container}>
      <Divider>请选择预约时间</Divider>
      <Tabs>
        {weeks.map((week) => (
          <Tabs.Tab title={week.weekLabel} key={week.weekValue}>
            <Selector
              columns={3}
              options={week.orderTimes || []}
              onChange={(arr) => setSelectSchedule(arr)}
            />
          </Tabs.Tab>
        ))}
      </Tabs>
      <Divider>请选择消费卡</Divider>
      <Divider />
      <Button
        color="primary"
        className={style.button}
        onClick={subscribeHandler}
      >
        立即预约
      </Button>
    </div>
  );
};

export default SubscribePopup;
