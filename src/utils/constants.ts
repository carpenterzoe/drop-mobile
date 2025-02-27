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
