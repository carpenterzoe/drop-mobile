import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Bottom from './components/Bottom/inex';
import styles from './App.module.less';

const App = () => (
  <div className={styles.container}>
    <Header />
    <Outlet />
    <Bottom />
  </div>
);

export default App;
