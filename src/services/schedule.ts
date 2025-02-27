import { useQuery } from '@apollo/client';
import {
  GET_CAN_SUBSCRIBE_COURSES,
} from '@/graphql/schedule';

// 获取我可以约的课程
export const useCanSubscribeCourses = () => {
  // 可约课程是根据门店分组的，所以这里类型是 TOrgsQuery
  const { loading, data } = useQuery<TOrgsQuery>(GET_CAN_SUBSCRIBE_COURSES);

  return {
    loading,
    data: data?.getCanSubscribeCourses.data,
  };
};
