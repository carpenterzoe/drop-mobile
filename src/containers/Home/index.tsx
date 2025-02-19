import { SearchBar } from 'antd-mobile';
import { useState } from 'react';
import TypeSelect from '@/components/TypeSelect';
import style from './index.module.less';

const Home = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  console.log(name, type);

  const onSearchHandler = (val: string) => {
    setName(val);
  };

  const onTypeChangeHandler = (key: string) => {
    setType(key);
  };
  return (
    <div className={style.container}>
      <SearchBar
        placeholder="搜索课程试试"
        onSearch={onSearchHandler}
      />
      <TypeSelect onChange={onTypeChangeHandler} />
    </div>
  );
};
export default Home;
