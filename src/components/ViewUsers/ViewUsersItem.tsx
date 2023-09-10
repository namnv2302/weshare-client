import { Button, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './ViewUsers.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';
import { AuthorizationData } from '@slices/authorizationSlice';
import { useAppSelector } from 'redux/hooks';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const ViewUsersItem = ({ data }: { data: AuthorizationData }) => {
  const navigate = useNavigate();
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('item')}>
      <div className={cx('left')}>
        <div
          className={cx('avatar')}
          onClick={() =>
            navigate(
              authorization && authorization.id !== data.id
                ? ROUTE_PATH.USER.replace(':slug', `${data?.slug}`)
                : ROUTE_PATH.PROFILE.replace(':slug', `${data?.slug}`),
            )
          }
        >
          <img src={AvatarDefault} alt="Avatar" />
        </div>
        <div className={cx('text-info')}>
          <Typography.Text
            className={cx('name')}
            onClick={() =>
              navigate(
                authorization && authorization.id !== data.id
                  ? ROUTE_PATH.USER.replace(':slug', `${data?.slug}`)
                  : ROUTE_PATH.PROFILE.replace(':slug', `${data?.slug}`),
              )
            }
          >
            {data.name || 'Jakob botosh'}
          </Typography.Text>
        </div>
      </div>
      {authorization && authorization.id !== data.id && <Button className={cx('btn-add')}>Add Friend</Button>}
    </div>
  );
};

export default ViewUsersItem;
