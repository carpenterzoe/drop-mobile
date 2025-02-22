import { useParams } from 'react-router-dom';
import { useOrganization } from '@/services/org';
import { Result } from 'antd-mobile';
import BaseInfo from './components/BaseInfo';
import DescInfo from './components/DescInfo';

const OrgInfo = () => {
  const { id } = useParams();
  const { data } = useOrganization(id || '');
  if (!data) {
    return <Result status="warning" title="提示" description="没有该门店信息" />;
  }
  return (
    <div>
      <BaseInfo data={data} />

      <DescInfo data={data} />
    </div>
  );
};
export default OrgInfo;
