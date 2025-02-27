import { List, Image, Button } from 'antd-mobile';
import style from './index.module.less';

interface IProps {
  dataSource: ICourse[];
  onSubscribe: (id: string) => void;
}

/**
*   课程列表
*/
const CourseList = ({
  dataSource,
  onSubscribe,
}: IProps) => (
  <div className={style.container}>
    <List>
      {
        dataSource.map((item) => (
          <List.Item
            key={item.id}
            prefix={
              (
                <Image
                  src={item.coverUrl}
                  alt="课程图片"
                  className={style.coverUrl}
                />
              )
            }
            extra={
              (
                <Button
                  fill="none"
                  color="primary"
                  onClick={() => onSubscribe(item.id)}
                >
                  预约
                </Button>
              )
            }
            description={
              item.teachers?.map((teacher) => teacher.name).join('，')
            }
          >
            {item.name}
          </List.Item>
        ))
      }
    </List>
  </div>
);

export default CourseList;
