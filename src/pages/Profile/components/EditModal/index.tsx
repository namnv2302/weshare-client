import { useCallback, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Typography, message } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './EditModal.module.scss';
import { updateUser } from '@apis/user';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { update } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const EditModal = ({ open, setOpenModal }: { open: boolean; setOpenModal: any }) => {
  const { t } = useTranslation(['Profile']);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);
  const [editing, setEditing] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    setOpenModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinish = useCallback(
    async (data: any) => {
      setEditing(true);
      try {
        if (authorization) {
          const resp = await updateUser(authorization.id, data);
          if (resp.status === 200 && resp.data) {
            dispatch(update(resp.data.data));
            message.success(t('EditModal.Success'));
            handleCancel();
          }
        }
        setEditing(false);
      } catch (error) {
        setEditing(false);
        handleCancel();
        message.error(t('EditModal.Error'));
      }
    },
    [authorization, t, handleCancel, dispatch],
  );

  return (
    <Modal className={cx('wrapper')} open={open} footer={null} onCancel={handleCancel}>
      <Typography.Text className={cx('label')}>{t('Label.Edit')}</Typography.Text>
      <Form
        form={form}
        name="edit"
        layout="vertical"
        requiredMark="optional"
        initialValues={{
          gender: authorization?.gender,
          age: authorization?.age,
          address: authorization?.address,
        }}
        autoComplete="off"
        className={cx('form')}
        onFinish={handleFinish}
      >
        <Form.Item
          label={<Typography.Text className={cx('form-label')}>{t('Label.Age')}</Typography.Text>}
          name="age"
          rules={[{ required: true }]}
        >
          <InputNumber min={16} step={1} className={cx('form-input')} />
        </Form.Item>
        <Form.Item
          label={<Typography.Text className={cx('form-label')}>{t('Label.Address')}</Typography.Text>}
          name="address"
          rules={[{ required: true }]}
        >
          <Input className={cx('form-input')} />
        </Form.Item>
        <Form.Item
          label={<Typography.Text className={cx('form-label')}>{t('Label.Gender')}</Typography.Text>}
          name="gender"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue="Male"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
            ]}
          />
        </Form.Item>
        <Form.Item className={cx('mb-0', 'button')}>
          <Button className={cx('cancel')} onClick={handleCancel}>
            {t('EditModal.Cancel')}
          </Button>
          <Button loading={editing} className={cx('submit')} htmlType="submit">
            {t('EditModal.Edit')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
