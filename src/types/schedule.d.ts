const SCHEDULE_STATUS = {
  NO_DO: ['NO_DO', 'primary', '未开始'], // 未开始
  DOING: ['DOING', 'success', '上课中'], // 正在上课中
  FINISH: ['FINISH', 'default', '下课了'], // 上完课了
  COMMENTED: ['COMMENTED', 'warning', '已评价'], // 已评价
  CANCEL: ['CANCEL', 'danger', '已取消'], // 已取消
};

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
