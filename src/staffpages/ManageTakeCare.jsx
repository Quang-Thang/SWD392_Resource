import React, { useState } from "react";
import { Layout, Input, List, Avatar, Typography, Divider, Button } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ManageTakeCare = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Truong Linh",
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

  const chatList = [
    {
      id: 1,
      user: "Truong Linh",
      lastMessage: "Hello shop",
      time: "15:30"
    },
    {
      id: 2,
      user: "Nguyen Van A",
      lastMessage: "Hi there",
      time: "14:20"
    },
    {
      id: 3,
      user: "Le Thi B",
      lastMessage: "Can you help?",
      time: "13:15"
    }
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={300} style={{ background: '#fff' }}>
        <Title level={4} style={{ margin: '16px', color: '#000' }}>Chats</Title>
        <Input.Search placeholder="Tìm kiếm" style={{ marginBottom: '16px' }} />
        <List
          itemLayout="horizontal"
          dataSource={chatList}
          renderItem={item => (
            <List.Item onClick={() => setSelectedChat(item.id)} style={{ cursor: 'pointer', padding: '10px 20px' }}>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={<Text style={{ color: selectedChat === item.id ? '#1890ff' : '#000' }}>{item.user}</Text>}
                description={item.lastMessage}
              />
              <Text type="secondary">{item.time}</Text>
            </List.Item>
          )}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: '24px', background: '#fff' }}>
          <div style={{ background: '#f0f0f0', padding: '10px 20px', borderRadius: '8px' }}>
            <Title level={5}>{chatList.find(chat => chat.id === selectedChat)?.user}</Title>
          </div>
          <Divider />
          <div style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
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
          <Divider />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextArea
              rows={1}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              style={{ marginRight: '8px', resize: 'none' }}
            />
            <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageTakeCare;