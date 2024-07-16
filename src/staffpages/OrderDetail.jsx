import React, { useState, useEffect } from "react";
import { Card, Col, Row, Table, Button, Typography } from "antd";
import { DownloadOutlined, ProfileOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

const { Title, Text } = Typography;

const OrderDetail = () => {
  const { id } = useParams(); // Lấy orderId từ URL
  const [order, setOrder] = useState(null); // State để lưu thông tin đơn hàng
  const [loading, setLoading] = useState(false); // State để quản lý trạng thái loading

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        // Xử lý lỗi, ví dụ hiển thị thông báo lỗi cho người dùng
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  const {
    shippingInfo,
    total,
    items,
    shippingMethod,
    paymentMethod,
    status,
    voucherId,
  } = order;

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const data = items.map((item, index) => ({
    key: index.toString(),
    productName: item.productId.name,
    quantity: item.quantity,
    total: `$${item.productId.regular_price * item.quantity}`,
  }));

  return (
    <div className="p-6 bg-gray-100">
      <Card className="mb-6 shadow">
        <Row gutter={16} justify="space-between" align="middle">
          <Col>
            <Title level={4}>Order ID: {id}</Title>
            <Text>{shippingInfo.name}</Text>
          </Col>
          <Col>
            <Text>Status: {status}</Text>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card
            title="Customer"
            extra={
              <Link
                to={`/staff/management-user/user-detail/${order.userId}`}
                type="link"
                icon={<ProfileOutlined />}
              >
                View Profile
              </Link>
            }
            className="shadow"
          >
            <p>Full Name: {shippingInfo.name}</p>
            <p>Email: {shippingInfo.email}</p>
            <p>Phone: {shippingInfo.phone}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Order Info"
            extra={
              <Button type="link" icon={<DownloadOutlined />}>
                View Order
              </Button>
            }
            className="shadow"
          >
            <p>Shipping: {shippingMethod}</p>
            <p>Payment Method: {paymentMethod}</p>
            <p>Status: {status}</p>
            {voucherId && (
              <p>
                Voucher: {voucherId.voucherCode} - {voucherId.voucher_discount}%
              </p>
            )}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Deliver to" className="shadow">
            <p>Address: {shippingInfo.address}</p>
          </Card>
        </Col>
      </Row>

      <Card title="Products" className="shadow">
        <Table columns={columns} dataSource={data} pagination={false} />
        <div className="flex justify-end mt-4">
          <div className="w-full md:w-1/4">
            <div className="flex justify-between py-1">
              <span>Subtotal:</span>
              <span>${total}</span>
            </div>
            {/* Các thông tin khác về tổng tiền, thuế, giảm giá, phí vận chuyển */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
