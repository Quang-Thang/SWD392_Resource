import React, { useState } from 'react';
import { Modal, Input, List, Avatar, Typography, Button } from 'antd';
import { UserOutlined, SendOutlined, MessageOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

const Chatbox = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Customer",
      text: "Hello shop",
      time: "15:30",
      isSender: false
    },
    {
      id: 2,
      user: "Shop",
      text: "Chào bạn, shop có thể giúp gì được cho bạn ạ",
      time: "15:31",
      isSender: true
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: "Shop",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: true
      }]);
      setMessage("");
    }
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        style={{ position: 'fixed', bottom: 30, right: 30 }}
        onClick={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        width={400}
        bodyStyle={{ padding: 0, borderRadius: '8px', overflow: 'hidden' }}
        style={{ position: 'fixed', bottom: 30, right: 30, marginRight: '20px' }}
        closable={false}
      >
        <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
          <Title level={5}>Bé và Mẹ</Title>
        </div>
        <div style={{ padding: '10px', height: '300px', overflowY: 'auto' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ marginBottom: '10px', textAlign: msg.isSender ? 'right' : 'left' }}>
              <div style={{
                display: 'inline-block',
                padding: '10px',
                borderRadius: '10px',
                background: msg.isSender ? '#e6f7ff' : '#f5f5f5',
                maxWidth: '60%'
              }}>
                <Text>{msg.text}</Text>
              </div>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>{msg.time}</Text>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
          <TextArea
            rows={1}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            style={{ marginRight: '8px', resize: 'none' }}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} />
        </div>
      </Modal>
    </>
  );
};

export default Chatbox;