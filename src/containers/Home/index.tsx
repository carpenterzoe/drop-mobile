import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import { Button } from 'antd-mobile';

const Home = () => {
  const { go } = useGoTo();

  return (
    <div>
      <Button onClick={() => go(ROUTE_KEY.MY)}>去编辑个人信息</Button>
    </div>
  );
};
export default Home;
