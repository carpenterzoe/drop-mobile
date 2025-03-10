import { useGoTo, useMatchedRoute, useTitle } from '@/hooks';
import { LeftOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import style from './index.module.less';

/**
*  顶部banner组件
*/
const Header = () => {
  const route = useMatchedRoute();
  useTitle(route?.name || '');
  const { back } = useGoTo();
  // 回退
  const onClickHandler = () => {
    back();
  };

  // 只有有header隐藏标记的页面才需要隐藏
  if (route?.hideHeader) {
    return null;
  }

  return (
    <div className={classNames({
      [style.largeContainer]: route?.isMenu,
      [style.smallContainer]: !route?.isMenu,
    })}
    >
      {!route?.isMenu && (
        <LeftOutline
          className={style.back}
          onClick={onClickHandler}
        />
      )}
      <div className={style.title}>
        {route?.name}
      </div>
    </div>
  );
};

export default Header;
