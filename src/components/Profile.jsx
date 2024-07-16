import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Table, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getAccountById, updateAccount } from "../services/api-service";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const accountId = localStorage.getItem("accountId");
      if (!accessToken || !accountId) {
        message.error("No access token found. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const data = await getAccountById(accountId);
        setUser({
          id: data.id,
          fullName: data.fullname,
          phone_number: data.phone,
          email: data.email,
        });
        form.setFieldsValue({
          fullName: data.fullname,
          phone_number: data.phone,
          email: data.email,
        });
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching user data");
      }
    };

    fetchUserData();
  }, [form, navigate]);

  const handleProfileSubmit = async (values) => {
    const accountId = user.id;
    try {
      const updatedData = { id: accountId, ...values };
      const response = await updateAccount(updatedData);

      if (response) {
        message.success("Profile updated successfully");
        localStorage.setItem("user", JSON.stringify({ name: values.fullName }));
        localStorage.setItem("phone_number", values.phone_number);
        localStorage.setItem("email", values.email);
        document.location.reload();
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating profile");
    }
  };

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      } else {
        message.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging out");
    }
  };

  const showOrderDetails = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Chi tiết',
      dataIndex: 'details',
      key: 'details',
      render: (text, record) => (
        <a onClick={() => showOrderDetails(record)} href="#!">
          {text}
        </a>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      orderId: '1',
      paymentMethod: 'Online',
      status: 'Đang giao',
      orderDate: '20/07/2024',
      details: 'Xem chi tiết',
    },
    {
      key: '2',
      orderId: '2',
      paymentMethod: 'Online',
      status: 'Đã giao',
      orderDate: '18/07/2024',
      details: 'Xem chi tiết',
    },
  ];

  const historyColumns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Ngày thực hiện',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
  ];

  const historyData = [
    {
      key: '1',
      transactionId: '1',
      orderId: '1',
      amount: '320.000',
      transactionDate: '20/07/2024',
    },
    {
      key: '2',
      transactionId: '2',
      orderId: '2',
      amount: '320.000',
      transactionDate: '18/07/2024',
    },
  ];

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100">
      <div className="w-1/5 bg-white p-4 rounded shadow-lg m-4">
        <Button
          type={activeTab === "profile" ? "primary" : "default"}
          className="w-full mb-2"
          onClick={() => setActiveTab("profile")}
        >
          Thông tin chung
        </Button>
        <Button
          type={activeTab === "orders" ? "primary" : "default"}
          className="w-full mb-2"
          onClick={() => setActiveTab("orders")}
        >
          Đơn hàng
        </Button>
        <Button
          type={activeTab === "history" ? "primary" : "default"}
          className="w-full"
          onClick={() => setActiveTab("history")}
        >
          Lịch sử giao dịch
        </Button>
      </div>
      <div className="w-4/5 bg-white p-10 rounded shadow-lg m-4">
        <h2 className="text-2xl font-bold mb-4">
          Thông tin người dùng
          <br />
        </h2>
        {activeTab === "profile" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Thông tin chung</h3>
            <div className="flex flex-col items-center mb-6">
              <img
                src="../assets/images/user.png"
                className="rounded-full w-20 h-20 mb-4"
                alt="User"
              />
              <Form form={form} initialValues={user} onFinish={handleProfileSubmit} className="w-full">
                <Form.Item name="email" label="Email" className="w-full">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="fullName" label="Tên" className="w-full">
                  <Input />
                </Form.Item>
                <Form.Item name="phone_number" label="SĐT" className="w-full">
                  <Input />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ" className="w-full">
                  <Input />
                </Form.Item>
                <Form.Item label="Điểm" className="w-full">
                  <Input value="100" disabled />
                </Form.Item>
                <div className="flex justify-between">
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                  <Button type="danger" className="bg-red-500 text-white" onClick={handleLogout}>
                    Đăng xuất
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
        {activeTab === "orders" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Đơn hàng</h3>
            <Table columns={columns} dataSource={data} />
          </div>
        )}
        {activeTab === "history" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Lịch sử giao dịch</h3>
            <Table columns={historyColumns} dataSource={historyData} />
          </div>
        )}
      </div>
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedOrder && (
          <div>
            <p><strong>Mã đơn hàng:</strong> {selectedOrder.orderId}</p>
            <p><strong>Ngày đặt hàng:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Khách hàng:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Số điện thoại:</strong> {user.phone_number}</p>
            <p><strong>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
            <Table
              columns={[
                { title: 'Tên sản phẩm', dataIndex: 'productName', key: 'productName' },
                { title: 'Giá', dataIndex: 'price', key: 'price' },
                { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' }
              ]}
              dataSource={[
                { key: '1', productName: 'SỮA BỘT OPTIMUM GOLD', price: '10', quantity: '1' },
                { key: '2', productName: 'SỮA BỘT OPTIMUM GOLD', price: '0', quantity: '1' }
              ]}
              pagination={false}
            />
            <p><strong>Tổng số tiền:</strong> 10 VNĐ</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserProfile;