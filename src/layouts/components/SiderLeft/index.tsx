import UserInfo from '@layouts/components/SiderLeft/components/UserInfo';
import Menu from '@layouts/components/SiderLeft/components/Menu';

const SiderLeft = () => {
  return (
    <>
      <UserInfo />
      <Menu />
      <div className="mt-22" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="text-default mr-10">Privacy terms</span>
        <span className="text-default mr-10">Advertising</span>
        <span className="text-default mr-10">Cookies</span>
        <span className="text-default">Flatform @ 2023</span>
      </div>
    </>
  );
};

export default SiderLeft;
