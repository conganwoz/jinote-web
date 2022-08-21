import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

let localConnection;
let sendChannel;

export default class P2PSender extends React.Component {
  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible != visible && visible) {
      this.createConnection();
    }
  }

  createConnection = () => {
    const servers = null;
    window.localConnection = localConnection = new RTCPeerConnection(servers);
    console.log('Created local peer connection object localConnection');

    sendChannel = localConnection.createDataChannel('sendDataChannel');
    console.log('Created send data channel');

    localConnection.onicecandidate = (e) => {
      this.onIceCandidate(e);
    };

    sendChannel.onopen = this.onSendChannelStateChange;
    sendChannel.onclose = this.onSendChannelStateChange;

    localConnection.createOffer().then(this.gotDescription, this.onCreateSessionDescriptionError);
  };

  gotDescription = (desc) => {
    localConnection.setLocalDescription(desc);
    console.log(`Offer from localConnection\n${desc.sdp}`);

    // send desc to remote
  };

  onIceCandidate = (event) => {
    // send ICE candidate to remote
    console.log('event__', event);
  };

  onSendChannelStateChange = () => {
    const readyState = sendChannel.readyState;
    console.log('Send channel state is: ' + readyState);

    if (readyState === 'open') {
      console.log('Ready send data');
    }
  };

  onCreateSessionDescriptionError = (error) => {
    console.log('Failed to create session description: ' + error.toString());
  };

  closeDataChannel = () => {
    console.log('closing data channel');
    sendChannel.close();
    console.log('closing connection');
    localConnection.close();
    localConnection = null;
  };

  render() {
    const { visible, onClose } = this.props;
    console.log('prpos__', this.props);
    return (
      <Modal title="Đồng bộ dữ liệu ngang hàng (P2P)" visible={visible} onCancel={onClose}>
        <div>Transfer P2P</div>
      </Modal>
    );
  }
}

P2PSender.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};
