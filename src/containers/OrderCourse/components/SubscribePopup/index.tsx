import {
  Button, Divider,
} from 'antd-mobile';
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
  console.log(courseId, onClose);
  return (
    <div className={style.container}>
      <Divider>请选择预约时间</Divider>
      <Divider>请选择消费卡</Divider>
      <Divider />
      <Button
        color="primary"
        className={style.button}
      >
        立即预约
      </Button>
    </div>
  );
};

export default SubscribePopup;
