import React, { useState, useEffect } from "react";
import { Button, Table, Modal, message, Breadcrumb } from "antd";
import {
  getAllOrders,
  getProductById,
  getAccountById,
} from "../services/api-service";

const { confirm } = Modal;

const ManagementOrder = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isOrderDetailModalVisible, setIsOrderDetailModalVisible] =
    useState(false);
  const [orderDetailProducts, setOrderDetailProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);

  const fetchOrders = async () => {
    try {
      const ordersData = await getAllOrders();
      setDataSource(ordersData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrderDetailProducts = async (orderDetails) => {
    try {
      const products = await Promise.all(
        orderDetails.map(async (detail) => {
          const product = await getProductById(detail.productId);
          return { ...detail, product };
        })
      );
      setOrderDetailProducts(products);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
  };

  const fetchCustomerDetails = async (customerId) => {
    try {
      const customer = await getAccountById(customerId);
      setCustomerDetails(customer);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết khách hàng:", error);
    }
  };

  const showOrderDetailModal = (record) => {
    setSelectedOrder(record);
    fetchOrderDetailProducts(record.orderDetails);
    fetchCustomerDetails(record.customerId);
    setIsOrderDetailModalVisible(true);
  };

  const handleCancel = () => {
    setIsOrderDetailModalVisible(false);
  };

  const calculateTotal = () => {
    return orderDetailProducts.reduce((total, detail) => {
      return total + detail.price * detail.quantity;
    }, 0);
  };

  const translateStatus = (status) => {
    switch (status) {
      case "Pending":
        return "Đang chờ xử lý";
      case "Processing":
        return "Đang xử lý";
      case "Shipped":
        return "Đã gửi";
      case "Delivered":
        return "Đã giao";
      case "Cancelled":
        return "Bị hủy";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "ID Đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ID Khách hàng",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: ["status", "orderStatus1"],
      key: "status",
      render: (status) => translateStatus(status),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: ["status", "orderDate"],
      key: "orderDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Chi tiết",
      key: "details",
      render: (text, record) => (
        <Button onClick={() => showOrderDetailModal(record)}>
          Xem Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">Tất cả đơn hàng</h1>
          <Breadcrumb className="text-gray-600 ml-4">
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Tất cả đơn hàng</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
      <Modal
        title="Chi tiết đơn hàng"
        visible={isOrderDetailModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedOrder && customerDetails && (
          <div>
            <div className="flex justify-between mb-4">
              <div>
                <p>
                  <strong>Mã đơn hàng:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Ngày đặt hàng:</strong>{" "}
                  {new Date(
                    selectedOrder.status.orderDate
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p>
                  <strong>Khách hàng:</strong>
                </p>
                <p>Tên: {customerDetails.name}</p>
                <p>Email: {customerDetails.email}</p>
                <p>Số điện thoại: {customerDetails.phone}</p>
              </div>
              <div>
                <p>
                  <strong>Thông tin đơn hàng:</strong>
                </p>
                <p>Phương thức thanh toán: {selectedOrder.payment}</p>
                <p>
                  Trạng thái:{" "}
                  {translateStatus(selectedOrder.status.orderStatus1)}
                </p>
                <p>Địa chỉ: {selectedOrder.address}</p>
              </div>
            </div>
            <Table
              dataSource={orderDetailProducts}
              columns={[
                {
                  title: "Tên sản phẩm",
                  dataIndex: ["product", "name"],
                  key: "name",
                },
                { title: "Giá", dataIndex: "price", key: "price" },
                { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
              ]}
              rowKey="id"
              pagination={false}
            />
            <div className="flex justify-end mt-4">
              <div>
                <p>
                  <strong>Tổng số tiền:</strong>{" "}
                  {calculateTotal().toLocaleString()} VND
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManagementOrder;
