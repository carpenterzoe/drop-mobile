import { useMutation, useQuery } from '@apollo/client';
import {
  GET_CAN_SUBSCRIBE_COURSES,
  GET_SCHEDULES_BY_COURSE,
  SUBSCRIBE_COURSE,
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

// 获取我可以约的某个课程的课程表
export const useSchedulesByCourse = (courseId: string) => {
  const { loading, data } = useQuery<TSchedulesQuery>(GET_SCHEDULES_BY_COURSE, {
    variables: {
      courseId,
    },
  });

  return {
    loading,
    data: data?.getSchedulesByCourse.data,
    total: data?.getSchedulesByCourse.page.total,
  };
};

// 立即预约课程
export const useSubscribeCourse = () => {
  const [subscribe, { loading }] = useMutation<TBaseQuery>(SUBSCRIBE_COURSE);

  const subscribeHandler = async (
    scheduleId: string,
    cardId: string,
  ) => {
    const res = await subscribe({
      variables: {
        scheduleId,
        cardId,
      },
    });
    return res.data?.subscribeCourse;
  };

  return {
    subscribe: subscribeHandler,
    loading,
  };
};
