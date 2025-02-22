import Home from '@/containers/Home';
import My from '@/containers/My';
import OrgInfo from '@/containers/OrgInfo';
import ProductInfo from '@/containers/ProductInfo';
import { ROUTE_KEY } from './menus';

/**
 * 解决循环依赖：把存在循环依赖的某部分单独隔离开。
 * 比如这里是把原本 routes 配置中的 element，单独隔离到另外一个文件。
 */
export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG_INFO]: OrgInfo,
  [ROUTE_KEY.PRODUCT_INFO]: ProductInfo,
};
