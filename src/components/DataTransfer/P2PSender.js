import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import { makeId } from '../../utils';

let localConnection;
let sendChannel;

export default class P2PSender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tunnelId: null, currentICECandidateEvent: null, description: null };
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible != visible && visible) {
      this.bootUpPeer();
    }
  }

  bootUpPeer = () => {
    this.initTunnelSocket();
  };

  initTunnelSocket = () => {
    const tunnelId = makeId();
    this.setState(
      {
        tunnelId: tunnelId,
        currentICECandidateEvent: null
      },
      () => {
        this.tunnelSocket = new WebSocket(
          'ws://' + 'localhost:8000' + '/ws/chat/' + tunnelId + '/'
        );

        this.tunnelSocket.onmessage = (e) => {
          const data = JSON.parse(e.data);
          console.log('peer_1_data_receive__', data);
          if (data?.message_type == 'receiver_connected') {
            console.log('in_boot_rtc_connection_');
            this.createConnection();
          } else if (data?.message_type == 'receiver_ice_candidate') {
            console.log('ice_candidate__', data);
            localConnection
              .addIceCandidate(new RTCIceCandidate(data.candidate))
              .then(this.onAddIceCandidateSuccess, this.onAddIceCandidateError);
          } else if (data?.message_type == 'receiver_desc') {
            console.log('receiver_desc__', data);
            localConnection.setRemoteDescription(new RTCSessionDescription(data?.description));
          }
        };

        this.tunnelSocket.onclose = (e) => {
          console.error('Chat socket closed unexpectedly', e);
        };
      }
    );
  };

  onAddIceCandidateSuccess = () => {
    console.log('AddIceCandidate success.');
  };

  onAddIceCandidateError = (error) => {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`);
  };

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
    console.log('real_desc__', desc);
    localConnection.setLocalDescription(desc);
    console.log(`Offer from localConnection\n${desc.sdp}`);

    this.setState({
      description: desc
    });

    this.tunnelSocket.send(
      JSON.stringify({
        message_type: 'sender_desc',
        description: desc
      })
    );

    // send desc to remote
  };

  onIceCandidate = (event) => {
    // send ICE candidate to remote

    console.log('event_candidate__', event.candidate);

    if (!event?.candidate) return;

    this.setState({ currentICECandidateEvent: event });

    this.tunnelSocket.send(
      JSON.stringify({
        message_type: 'sender_ice_candidate',
        candidate: event.candidate,
        message: 'new_ice_candidate'
      })
    );
  };

  onSendChannelStateChange = () => {
    const readyState = sendChannel.readyState;
    console.log('Send channel state is: ' + readyState);

    if (readyState === 'open') {
      console.log('Ready send data');
      this.sendData();
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

  sendData = () => {
    const { selectedNotes } = this.props;

    sendChannel.send(
      JSON.stringify({
        notes: selectedNotes
      })
    );

    console.log('Sent Data');
  };

  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal title="Đồng bộ dữ liệu ngang hàng (P2P)" visible={visible} onCancel={onClose}>
        <div>Transfer P2P</div>
      </Modal>
    );
  }
}

P2PSender.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  selectedNotes: PropTypes.array
};
