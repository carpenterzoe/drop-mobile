import mySvg from '@/assets/my.svg';
import courseSvg from '@/assets/course.svg';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  isMenu?: boolean;
  hideHeader?: boolean;
}

// 这里路由用key值匹配，是为了不同地方跳转时，只要用变量即可
// 如果用字符串匹配，到处都要修改，尤其是微前端跨项目的场景，前缀经常变动，修改很麻烦，很容易遗漏
export const ROUTE_KEY = {
  HOME: 'home',
  EDIT_INFO: 'editInfo',
  MY: 'my',
  ORG_INFO: 'OrgInfo',
  PRODUCT_INFO: 'productInfo',
  BUY: 'buy',
  MY_CARD: 'myCard',
  ORDER_COURSE: 'orderCourse',
  MY_COURSE: 'myCourse',
};

/**
 * 循环依赖：Home组件引用了 routes ， routes 内部也 import 了当前组件。
 *
 * 解决方案：把存在循环依赖的某部分单独隔离开。比如这里是 routes 中的 element，所以要想办法隔离。
 */
export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '', // 这里没有斜杠，因为Layout已经写了
    name: '精品课程',
    isMenu: true,
    icon: courseSvg,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '我的',
    isMenu: true,
    icon: mySvg,
  },
  [ROUTE_KEY.EDIT_INFO]: {
    path: 'editInfo',
    name: '编辑个人信息',
    isMenu: false,
  },
  [ROUTE_KEY.ORG_INFO]: {
    path: 'orgInfo/:id',
    name: '门店详情',
    isMenu: false,
  },
  [ROUTE_KEY.PRODUCT_INFO]: {
    path: 'productInfo/:id',
    name: '商品详情',
    isMenu: false,
  },
  [ROUTE_KEY.BUY]: {
    path: 'buy/:id',
    name: '购买信息',
    isMenu: false,
  },
  [ROUTE_KEY.MY_CARD]: {
    path: 'myCard',
    name: '我的消费卡',
    isMenu: false,
  },
  [ROUTE_KEY.ORDER_COURSE]: {
    path: 'orderCourse',
    name: '预约课程',
    isMenu: false,
  },
  [ROUTE_KEY.MY_COURSE]: {
    path: 'myCourse',
    name: '我的课程表',
    isMenu: false,
  },
};

// 根据key value的内容，生成真正的给router使用的配置
export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
