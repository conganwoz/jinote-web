import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BiDotsVertical } from 'react-icons/bi';
import { Badge, Dropdown, Menu, message } from 'antd';

import { saveNote } from '../../actions/note';
import { P2PReceiver, P2PSender } from '../DataTransfer';
import { UploadCloud } from '../Cloud';

function SideBarMenu({ selectedNotes, saveNote }) {
  const [visibleModal, setVisible] = useState(false);
  const [isDownloadNotes, setIsDownloadNote] = useState(false);
  const [isVisibleP2PTransder, setVisibleP2PTransfer] = useState(false);
  const [isVisibleP2PReceiver, setVisibleP2PReceiver] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const openModalP2PTransfer = () => setVisibleP2PTransfer(true);
  const closeModalP2PTransfer = () => setVisibleP2PTransfer(false);

  const openModalP2PReceiver = () => setVisibleP2PReceiver(true);
  const closeModalP2PReceiver = () => setVisibleP2PReceiver(false);

  const menuOptions = [
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
      onClick: () => {
        if (selectedNotes?.length <= 0) return message.warning('Vui lòng chọn note bạn muốn gửi');
        openModalP2PTransfer();
      }
    },
    {
      key: '4',
      label: 'Nhận dữ liệu P2P',
      onClick: openModalP2PReceiver
    }
  ];

  return (
    <>
      <div className="c-menu">
        <Badge dot count={selectedNotes?.length}>
          <Dropdown overlay={<Menu items={menuOptions} />} placement="right">
            <BiDotsVertical className="c-menu__icon" />
          </Dropdown>
        </Badge>
      </div>
      <UploadCloud
        isVisible={visibleModal}
        isDownloadNotes={isDownloadNotes}
        closeModal={closeModal}
        saveNote={saveNote}
        selectedNotes={selectedNotes}
      />
      <P2PSender
        selectedNotes={selectedNotes}
        visible={isVisibleP2PTransder}
        onClose={closeModalP2PTransfer}
      />
      <P2PReceiver visible={isVisibleP2PReceiver} onClose={closeModalP2PReceiver} />
    </>
  );
}

SideBarMenu.propTypes = {
  selectedNotes: PropTypes.arrayOf(PropTypes.object),
  saveNote: PropTypes.func
};

export default connect(null, { saveNote })(SideBarMenu);
