import { useMutation, useQuery } from '@apollo/client';
import {
  CANCEL_SUBSCRIBE,
  GET_CAN_SUBSCRIBE_COURSES,
  GET_SCHEDULE_RECORD,
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

// 获取我的课程表记录
export const useScheduleRecords = () => {
  const { data, refetch, loading } = useQuery<TScheduleRecordsQuery>(GET_SCHEDULE_RECORD, {
    variables: {
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    },
  });

  return { data: data?.getScheduleRecords.data, loading, refetch };
};

// 立即取消预约课程
export const useCancelSubscribeCourse = () => {
  const [cancel, { loading }] = useMutation<TBaseQuery>(CANCEL_SUBSCRIBE);

  const cancelHandler = async (
    scheduleRecordId: string,
  ) => {
    const res = await cancel({
      variables: {
        scheduleRecordId,
      },
    });
    return res.data?.cancelSubscribeCourse;
  };

  return {
    cancel: cancelHandler,
    loading,
  };
};
