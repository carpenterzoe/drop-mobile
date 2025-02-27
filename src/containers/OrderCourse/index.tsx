import { useCanSubscribeCourses } from '@/services/schedule';
import {
  DotLoading, Popup, Result, Space, Steps,
} from 'antd-mobile';
import { Step } from 'antd-mobile/es/components/steps/step';
import { useState } from 'react';
import CourseList from './components/CourseList';
import style from './index.module.less';
// import SubscribePopup from './components/SubscribePopup';

/**
*   预约课程
*/
const OrderCourse = () => {
  const [curCourse, setCurCourse] = useState<string>('');
  console.log('curCourse: ', curCourse);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { data, loading } = useCanSubscribeCourses();
  const onSubscribeHandler = (id: string) => {
    setCurCourse(id);
    setShowPopup(true);
  };
  if (loading) {
    return (
      <Space justify="center">
        <DotLoading color="primary" />
      </Space>
    );
  }
  if (!data || data.length === 0) {
    return (
      <Result
        status="warning"
        title="没有可以约的课程"
      />
    );
  }
  const onCloseHandler = () => {
    setCurCourse('');
    setShowPopup(false);
  };
  return (
    <div className={style.container}>
      <Steps
        direction="vertical"
      >
        {
          data.map((item) => (
            <Step
              title={item.name}
              key={item.id}
              description={
                item.courses
                  ? (<CourseList dataSource={item.courses} onSubscribe={onSubscribeHandler} />)
                  : null
              }
              icon={(
                <img
                  className={style.logo}
                  src={item.logo}
                  alt=""
                />
                  )}
            />
          ))
      }
      </Steps>
      <Popup
        visible={showPopup}
        position="bottom"
        onMaskClick={onCloseHandler}
        onClose={onCloseHandler}
      >
        gdfgfg
        {/* {curCourse && <SubscribePopup courseId={curCourse} onClose={onCloseHandler} />} */}
      </Popup>
    </div>
  );
};

export default OrderCourse;
