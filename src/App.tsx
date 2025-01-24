import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FIND, UPDATE } from './graphql/demo';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const { loading, data } = useQuery(FIND, {
    variables: { id: 'dada' },
  });

  const [update] = useMutation(UPDATE);

  const onChangeNameHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
    setName(v.target.value);
  };
  const onChangeDescHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(v.target.value);
  };

  const onClickHandler = () => {
    update({
      variables: {
        id: 'dada',
        params: {
          name,
          desc,
          avatar: 'avatar',
        },
      },
    });
  };

  return (
    <div>
      <p>
        data:
        {JSON.stringify(data)}
      </p>

      {JSON.stringify(loading)}
      <p>{loading}</p>

      <p>
        name:
        <input onChange={onChangeNameHandler} />
      </p>
      <p>
        desc:
        <input onChange={onChangeDescHandler} />
      </p>

      <button type="button" onClick={onClickHandler}>
        btn
      </button>
    </div>
  );
};

export default App;
