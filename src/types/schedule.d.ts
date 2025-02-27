// 课程表
interface ISchedule {
  id: string;
  startTime: string;
  endTime: string;
  buyTime: string;
  schoolDay: string; // 上课日期
  course: ICourse;
  teacher: ITeacher;
}

type TSchedulesQuery = TBaseQuery<ISchedule[]>;

interface IScheduleRecord {
  id: string;
  subscribeTime: string;
  tel: string;
  status: keyof typeof SCHEDULE_STATUS;
  course: ICourse;
  student: IStudent;
  schedule: ISchedule;
  org: IOrganization;
}

type TScheduleRecordsQuery = TBaseQuery<IScheduleRecord[]>;
