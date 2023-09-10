import { Result, Typography } from 'antd';
import NoDataImage from '@assets/images/no-data.jpg';

const NoData = ({ title }: { title: string }) => {
  return (
    <Result
      style={{ padding: '16px' }}
      title={<Typography.Text className="text-default">{title}</Typography.Text>}
      icon={<img src={NoDataImage} alt="No data" style={{ width: '100px', borderRadius: '10px' }} />}
    />
  );
};

export default NoData;
