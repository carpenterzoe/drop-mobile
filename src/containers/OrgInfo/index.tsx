import { useParams } from 'react-router-dom';
import { useOrganization } from '@/services/org';
import { Result } from 'antd-mobile';
import Hr from '@/components/Hr';
import BaseInfo from './components/BaseInfo';
import DescInfo from './components/DescInfo';
import RecommendProducts from './components/RecommendProducts';

const OrgInfo = () => {
  const { id } = useParams();
  const { data } = useOrganization(id || '');
  if (!data) {
    return <Result status="warning" title="提示" description="没有该门店信息" />;
  }
  return (
    <div>
      <BaseInfo data={data} />
      <Hr />
      <DescInfo data={data} />
      <Hr />
      <RecommendProducts orgId={id || ''} />
    </div>
  );
};
export default OrgInfo;
