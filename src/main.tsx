import { createRoot } from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './utils/apollo';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
