import { connect, useGetStudent } from '@/hooks/userHooks';
import { DotLoading } from 'antd-mobile';

/**
*   获取用户信息，返回 context provider包裹的子组件
*/
const StudentInfo = ({ children }: IPropChild) => {
  const { loading } = useGetStudent();
  return (
    loading
      ? <DotLoading />
      : (
        <div>
          {children}
        </div>
      )
  );
};

// Provider 包裹子组件
const ConnectedStudentInfo = connect(StudentInfo);

export default ConnectedStudentInfo;
