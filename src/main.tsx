import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import client from './utils/apollo';
import { routes } from './routes/menus';
import { ROUTE_COMPONENT } from './routes/components';
import Login from './containers/Login';
import Register from './containers/Register';
import './theme.css';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<App />}>
          {/* 这里面的内容可以用 useOutlet 拿到 */}
          {
              routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key];
                return <Route path={item.path} element={<Component />} key={item.key} />;
              })
            }
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
);
