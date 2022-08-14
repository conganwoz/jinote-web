import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Progress, Divider } from 'antd';
export default function UploadProgress({ title, queue, consumeFunc, close }) {
  const [count, setCount] = useState(0);
  const [results, setResult] = useState([]);

  const percent = Math.round((count / (queue?.length / 1)) * 100);

  useEffect(() => {
    consume();
  }, []);

  const consume = async () => {
    Promise.all(
      queue?.map(async (note) => {
        const result = await consumeFunc(note);
        setResult((prev) => prev.concat(result));
        setCount((prevCount) => prevCount + 1);
      })
    );
  };

  return (
    <Modal title={title} visible={true} footer={null} onCancel={close}>
      <Progress
        strokeColor={{
          from: '#108ee9',
          to: '#87d068'
        }}
        percent={percent}
        status="active"
        strokeWidth={50}
      />
      <Divider />

      {results?.map((item) => (
        <div key={item?.id} style={{ marginTop: 10 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
            <div>
              <span>
                <span style={{ fontWeight: 600, color: '#000' }}>{item?.id}</span> -{' '}
                {item?.title || ''}
              </span>
            </div>
            <div>
              <span style={{ color: item?.success ? '#389e0d' : '#cf1322' }}>
                {item?.message || ''}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );
}

UploadProgress.propTypes = {
  title: PropTypes.string,
  queue: PropTypes.array,
  consumeFunc: PropTypes.func,
  close: PropTypes.func
};
