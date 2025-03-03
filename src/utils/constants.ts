export const AUTH_TOKEN = 'mobile_auth_token';
export const DEFAULT_TYPE = 'all';
export const DEFAULT_PAGE_SIZE = 10;
export const DISABLE_DEV = true; // 用于控制支付设置是测试环境还是生产环境，没有支付相关微信公众号等资料，暂时禁用

export const DAY_FORMAT = 'YYYY-MM-DD';

export const CARD_TYPE = {
  TIME: ['time', '次数卡'],
  DURATION: ['duration', '时长卡'],
};

export const CARD_STATUS = {
  VALID: 'VALID', // 有效
  EXPIRED: 'EXPIRED', // 过期
  DEPLETE: 'DEPLETE', // 耗尽
};

// 课程记录的状态 元素内容分别表示课程状态code 颜色标识 实际含义
export const SCHEDULE_STATUS = {
  NO_DO: ['NO_DO', 'primary', '未开始'], // 未开始
  DOING: ['DOING', 'success', '上课中'], // 正在上课中
  FINISH: ['FINISH', 'default', '下课了'], // 上完课了
  COMMENTED: ['COMMENTED', 'warning', '已评价'], // 已评价
  CANCEL: ['CANCEL', 'danger', '已取消'], // 已取消
};
