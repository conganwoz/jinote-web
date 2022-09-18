import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Modal, Input, message, Button } from 'antd';

import { db } from '../../database/db';
import { API_URL } from '../../env-config';
import { UploadProgress } from '../Common';

function UploadCloud({ isVisible, isDownloadNotes, closeModal, saveNote, selectedNotes }) {
  const [isUploadCloud, setIsUploadCloud] = useState(false);
  const [alias, setAlias] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [isFetchingCloudNotes, setFetchingCloudNotes] = useState(false);

  const closeUploadCloud = () => setIsUploadCloud(false);

  const getNotes = async () => {
    const url = `${API_URL}/download_notes/`;

    const body = {
      alias: alias,
      password: password
    };

    setFetchingCloudNotes(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data?.success) {
        message.success('Tải xuống note thành công.');
        const saveAt = dayjs().format('DD/MM/YYYY HH:mm:ss');

        data?.notes?.forEach((note) => {
          saveNote({
            note: {
              ...(note || {}),
              cloudId: note?.id || '',
              updatedAt: saveAt
            }
          });
        });
      } else message.error(data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingCloudNotes(false);
    }
  };

  const consumeFunc = async (note) => {
    const url = `${API_URL}/upload_note/`;
    const body = {
      title: note?.title || '',
      content: note?.content || '',
      password: password || '',
      alias: alias || '',
      cloud_id: note?.cloudId || ''
    };

    let result = note;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data?.success)
        await db?.notes?.update(note?.id, { ...note, cloudId: data?.note?.id || '' });

      result = { ...(result || {}), ...(data || {}) };
    } catch (error) {
      console.log(error);
    } finally {
      // eslint-disable-next-line
      return result;
    }
  };

  return (
    <>
      {isUploadCloud && (
        <UploadProgress
          close={closeUploadCloud}
          queue={selectedNotes}
          consumeFunc={consumeFunc}
          title="Đồng bộ cloud"
        />
      )}
      <Modal
        footer={[
          <Button key="back" onClick={closeModal}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isFetchingCloudNotes}
            onClick={() => {
              if (isDownloadNotes) getNotes();
              else {
                closeModal();
                setIsUploadCloud(true);
              }
            }}>
            {isDownloadNotes ? 'Tải xuống' : 'Tải lên'}
          </Button>
        ]}
        title={isDownloadNotes ? 'Xử lý tải xuống note' : 'Xử lý đồng bộ'}
        visible={isVisible}
        onCancel={closeModal}
        okText={isDownloadNotes ? 'Tải xuống' : 'Tải lên'}
        cancelText="Hủy"
        onOk={() => {
          if (isDownloadNotes) getNotes();
          else {
            closeModal();
            setIsUploadCloud(true);
          }
        }}>
        <Input addonBefore="Bí danh" value={alias} onChange={(e) => setAlias(e?.target?.value)} />

        <Input
          style={{ marginTop: 10 }}
          addonBefore="Mật khẩu mở khóa"
          value={password}
          onChange={(e) => setPassword(e?.target?.value)}
        />
      </Modal>
    </>
  );
}

UploadCloud.propTypes = {
  isVisible: PropTypes.bool,
  isDownloadNotes: PropTypes.bool,
  closeModal: PropTypes.func,
  saveNote: PropTypes.func,
  selectedNotes: PropTypes.array
};

export default UploadCloud;
