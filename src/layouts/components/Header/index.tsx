import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Logo from './components/Logo';
import RightPanel from './components/RightPanel';
import Search from './components/Search';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('left')}>
        <Logo />
        <Search />
      </div>
      <RightPanel />
    </div>
  );
};

export default Header;
