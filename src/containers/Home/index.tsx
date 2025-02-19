import { SearchBar } from 'antd-mobile';
import { useState } from 'react';
import style from './index.module.less';

const Home = () => {
  const [name, setName] = useState('');
  console.log('name: ', name);
  const onSearchHandler = (val: string) => {
    setName(val);
  };
  return (
    <div className={style.container}>
      <SearchBar
        placeholder="搜索课程试试"
        onSearch={onSearchHandler}
      />
    </div>
  );
};
export default Home;
