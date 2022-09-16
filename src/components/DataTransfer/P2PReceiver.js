import React, { Component } from 'react';
import { Modal, Input, message } from 'antd';
import PropTypes from 'prop-types';
let remoteConnection;
let receiveChannel;

export class P2PReceiver extends Component {
  constructor(props) {
    super(props);
    this.state = { tunnelId: null, currentICECandidateEvent: null, messageStatus: null };
  }

  // componentDidUpdate(prevProps) {
  //   const { visible } = this.props;
  //   if (prevProps.visible != visible && visible) {
  //     this.bootUpPeer();
  //   }
  // }

  createConnection = () => {
    const servers = null;
    window.remoteConnection = remoteConnection = new RTCPeerConnection(servers);
    console.log('Created remote peer connection object remoteConnection');

    remoteConnection.onicecandidate = (e) => {
      this.onIceCandidate(e);
    };

    this.setState({ messageStatus: 'Đã tạo kết nối cục bộ' });

    remoteConnection.ondatachannel = this.receiveChannelCallback;
  };

  receiveChannelCallback = (event) => {
    console.log('Receive Channel Callback');
    receiveChannel = event.channel;
    receiveChannel.onmessage = this.onReceiveMessageCallback;
    receiveChannel.onopen = this.onReceiveChannelStateChange;
    receiveChannel.onclose = this.onReceiveChannelStateChange;
  };

  onReceiveMessageCallback = (event) => {
    message.success('Đã nhận được dữ liệu');
    this.setState({ messageStatus: 'Đã nhận được dữ liệu' });
    console.log('Received Message', JSON.parse(event.data));
  };

  onReceiveChannelStateChange = (event) => {
    console.log('event__', event);
    const readyState = receiveChannel.readyState;
    console.log(`Receive channel state is: ${readyState}`);
  };

  onIceCandidate = (event) => {
    console.log('event_candidate__', event.candidate);

    if (!event?.candidate) return;

    this.setState({ currentICECandidateEvent: event });

    this.tunnelSocket.send(
      JSON.stringify({
        message_type: 'receiver_ice_candidate',
        candidate: event.candidate,
        message: 'new_ice_candidate'
      })
    );
  };

  onAddIceCandidateSuccess = () => {
    console.log('AddIceCandidate success.');
  };

  onAddIceCandidateError = (error) => {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`);
  };

  bootUpPeer = () => {
    this.joinTunnelSocket();
  };

  joinTunnelSocket = () => {
    const { tunnelId } = this.state;

    this.tunnelSocket = new WebSocket('ws://' + 'localhost:8000' + '/ws/chat/' + tunnelId + '/');

    this.tunnelSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('peer_2_data_receive__', data);

      if (data?.message_type == 'sender_ice_candidate') {
        console.log('ice_candidate__', data);

        remoteConnection
          .addIceCandidate(new RTCIceCandidate(data.candidate))
          .then(this.onAddIceCandidateSuccess, this.onAddIceCandidateError);
      } else if (data?.message_type == 'sender_desc') {
        this.setState({ messageStatus: 'Máy gửi đã gửi yêu cầu chuyển dữ liệu' });
        this.addRemoteDesc(data);
      }
    };

    this.tunnelSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly', e);
    };

    this.tunnelSocket.onopen = () => {
      this.createConnection();
      // send connect socket signal
      this.tunnelSocket.send(
        JSON.stringify({
          message_type: 'receiver_connected',
          message: 'connected'
        })
      );
    };
  };

  addRemoteDesc = async (data) => {
    const desc = new RTCSessionDescription(data?.description);
    await remoteConnection.setRemoteDescription(desc);
    console.log('in_here__', desc);
    remoteConnection.createAnswer().then(this.gotDescription, this.onCreateSessionDescriptionError);
  };

  gotDescription = (desc) => {
    remoteConnection.setLocalDescription(desc);
    console.log(`Answer from remoteConnection\n${desc.sdp}`);
    this.tunnelSocket.send(
      JSON.stringify({
        message_type: 'receiver_desc',
        description: desc
      })
    );
  };

  onCreateSessionDescriptionError = (error) => {
    console.log('Failed to create session description: ' + error.toString());
  };

  render() {
    const { visible, onClose } = this.props;
    const { tunnelId, messageStatus } = this.state;
    return (
      <Modal
        title="Đồng bộ dữ liệu ngang hàng (P2P)"
        visible={visible}
        onCancel={onClose}
        cancelText="Huỷ"
        okText="Nhận dữ liệu"
        onOk={() => {
          if (!tunnelId) return message.error('Vui lòng nhập mã nhận dữ liệu');

          this.bootUpPeer();
        }}>
        <div>
          <div>
            <span style={{ fontSize: 11 }}>Mã nhận dữ liệu:</span>
          </div>
          <Input
            placeholder="AD123"
            value={tunnelId}
            onChange={(e) => {
              this.setState({ tunnelId: e?.target?.value });
            }}
          />

          <div style={{ marginTop: 10 }}>
            {messageStatus ? (
              <span style={{ fontSize: 11, color: 'rgba(119,119,119,0.9)' }}>{messageStatus}</span>
            ) : null}
          </div>
        </div>
      </Modal>
    );
  }
}

export default P2PReceiver;

P2PReceiver.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};
