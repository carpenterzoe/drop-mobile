import { TabBar } from 'antd-mobile';
import { routes } from '@/routes/menus';
import { useGoTo, useMatchedRoute } from '@/hooks';
import style from './index.module.less';
import SvgWrapper from '../SvgWrapper';
// import SvgWrapper from '../SvgWrapper';

/**
*   底部导航栏
*/
const Bottom = () => {
  const { go } = useGoTo();
  const route = useMatchedRoute();
  // 当地底部导航栏发生变化时
  const onTabChangeHandler = (key: string) => {
    go(key);
  };
  const iconRender = (active: boolean, iconUrl?: string) => (
    <SvgWrapper
      src={iconUrl}
      color={active ? '#01979a' : '#999999'}
    />
  );

  // 只有标记isMenu的页面需要底部菜单
  if (!route?.isMenu) {
    return null;
  }
  return (
    <div className={style.container}>
      <TabBar
        onChange={onTabChangeHandler}
        activeKey={route?.key}
      >
        {
          routes.filter((it) => it.isMenu).map(
            (item) => (
              <TabBar.Item
                key={item.key}
                title={item.name}
                icon={(active) => iconRender(active, item.icon)}
              />
            ),
          )
        }
      </TabBar>
    </div>
  );
};

export default Bottom;
