import { useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { Badge, Dropdown, Menu, Modal, Input, message, Button } from 'antd';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { UploadProgress } from '../Common';
import { P2PSender } from '../DataTransfer';
import { API_URL } from '../../env-config';
import { db } from '../../database/db';
import { saveNote } from '../../actions/note';

function SideBarMenu({ selectedNotes, saveNote }) {
  const [isUploadCloud, setIsUploadCloud] = useState(false);
  const [alias, setAlias] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [visibleModal, setVisible] = useState(false);
  const [isDownloadNotes, setIsDownloadNote] = useState(false);
  const [isFetchingCloudNotes, setFetchingCloudNotes] = useState(false);
  const [isVisibleP2PTransder, setVisibleP2PTransfer] = useState(false);
  const closeUploadCloud = () => setIsUploadCloud(false);

  const openModal = () => setVisible(true);
  const closeModal = () => {
    setVisible(false);
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
      if (data?.success) {
        await db?.notes?.update(note?.id, { ...note, cloudId: data?.note?.id || '' });
      }

      result = { ...(result || {}), ...(data || {}) };
    } catch (error) {
      console.log(error);
    } finally {
      // eslint-disable-next-line
      return result;
    }
  };

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
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingCloudNotes(false);
    }
  };

  const openModalP2PTransfer = () => setVisibleP2PTransfer(true);
  const closeModalP2PTransfer = () => setVisibleP2PTransfer(false);

  return (
    <>
      <div style={{ cursor: 'pointer' }}>
        <Badge dot count={selectedNotes?.length}>
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    key: '1',
                    label: 'Đồng bộ cloud',
                    onClick: () => {
                      if (selectedNotes?.length <= 0)
                        return message.warning('Vui lòng chọn note bạn muốn đồng bộ');
                      openModal();
                    }
                  },
                  {
                    key: '2',
                    label: 'Tải xuống note',
                    onClick: () => {
                      setIsDownloadNote(true);
                      openModal();
                    }
                  },
                  {
                    key: '3',
                    label: 'Chuyển dữ liệu P2P',
                    onClick: openModalP2PTransfer
                  }
                ]}
              />
            }
            placement="right">
            <BiDotsVertical style={{ fontSize: 25, color: '#000' }} />
          </Dropdown>
        </Badge>
      </div>
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
              if (isDownloadNotes) {
                getNotes();
              } else {
                closeModal();
                setIsUploadCloud(true);
              }
            }}>
            {isDownloadNotes ? 'Tải xuống' : 'Tải lên'}
          </Button>
        ]}
        title={isDownloadNotes ? 'Xử lý tải xuống note' : 'Xử lý đồng bộ'}
        visible={visibleModal}
        onCancel={closeModal}
        okText={isDownloadNotes ? 'Tải xuống' : 'Tải lên'}
        cancelText="Hủy"
        onOk={() => {
          if (isDownloadNotes) {
            getNotes();
          } else {
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
      <P2PSender
        selectedNotes={selectedNotes}
        visible={isVisibleP2PTransder}
        onClose={closeModalP2PTransfer}
      />
    </>
  );
}

SideBarMenu.propTypes = {
  selectedNotes: PropTypes.arrayOf(PropTypes.object),
  saveNote: PropTypes.func
};

export default connect(null, { saveNote })(SideBarMenu);
