import * as classNames from 'classnames';
import {
  Button, Form, Input, ImageUploader,
} from 'antd-mobile';

import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPDATE } from './graphql/demo';
import './App.css';
import { useUploadOSS } from './hooks/useUploadOSS';

import styles from './App.module.less';

const App = () => {
  const uploadHandler = useUploadOSS();
  const [name] = useState('');
  const [desc] = useState('');
  const [update] = useMutation(UPDATE);

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
    <div className={styles.container}>
      <Form
        className={classNames(styles.form, styles.formPadding)}
        layout="horizontal"
        onFinish={onClickHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
      )}
      >
        <Form.Item
          name="name"
          label="姓名"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="desc"
          label="描述"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="actor"
          label="头像"
        >
          <ImageUploader upload={uploadHandler} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
