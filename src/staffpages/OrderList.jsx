import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Breadcrumb,
  Button,
  Menu,
  Dropdown,
  Modal,
  message,
  Select,
} from "antd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  getAllOrders,
  updateOrderStatus,
  confirmDeliveredOrder,
  getProductById,
} from "../services/api-service";

const { Option } = Select;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [isShipperAssignModalVisible, setIsShipperAssignModalVisible] =
    useState(false);
  const [selectedOrderForShipping, setSelectedOrderForShipping] =
    useState(null);
  const [shippers] = useState([
    { id: 1, name: "Shipper A" },
    { id: 2, name: "Shipper B" },
    { id: 3, name: "Shipper C" },
  ]);

  const statusMapping = {
    Pending: "Đang chờ xử lý",
    Processing: "Đang xử lý",
    Shipped: "Đã gửi",
    Delivered: "Đã giao",
    Cancelled: "Hủy bỏ",
    Deliveried: "Đã giao",
    "Waiting to be accepted": "Đang chờ được xác nhận",
    Accepted: "Đã được xác nhận",
    "On-delivering": "Đang được giao",
    Canceled: "Bị hủy",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersData = await getAllOrders();
        const formattedOrderData = ordersData.map((order) => ({
          ...order,
          createdAt: order.status.orderDate
            ? order.status.orderDate.split("T")[0]
            : order.status.orderDate,
          total: order.orderDetails.reduce(
            (acc, detail) => acc + detail.quantity * detail.price,
            0
          ),
        }));
        setOrders(formattedOrderData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleMenuClick = (action, record) => {
    if (action === "view") {
      setSelectedOrder(record);
      fetchOrderDetails(record.orderDetails);
      setIsModalVisible(true);
    } else if (
      action === "assignShipping" &&
      record.status.orderStatus1 === "Processing"
    ) {
      setSelectedOrderForShipping(record);
      setIsShipperAssignModalVisible(true);
    } else if (action === "confirmDelivery") {
      handleConfirmDelivery(record);
    } else {
      handleStatusChange(record, action);
    }
  };

  const handleStatusChange = async (record, status) => {
    console.log(
      `Đang thay đổi trạng thái thành ${status} cho Đơn hàng ID: ${record.id}`
    );
    try {
      await updateOrderStatus(record.id, 37, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === record.id
            ? { ...order, status: { ...order.status, orderStatus1: status } }
            : order
        )
      );
      message.success("Cập nhật trạng thái đơn hàng thành công");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      message.error("Không thể cập nhật trạng thái đơn hàng");
    }
  };

  const handleConfirmDelivery = async (record) => {
    console.log(`Xác nhận giao hàng cho Đơn hàng ID: ${record.id}`);
    try {
      await confirmDeliveredOrder(record.id);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === record.id
            ? {
                ...order,
                status: { ...order.status, orderStatus1: "Delivered" },
              }
            : order
        )
      );
      message.success("Đơn hàng đã được xác nhận là đã giao");
    } catch (error) {
      console.error("Lỗi khi xác nhận giao hàng:", error);
      message.error("Không thể xác nhận giao hàng");
    }
  };

  const fetchOrderDetails = async (orderDetails) => {
    try {
      const details = await Promise.all(
        orderDetails.map(async (detail) => {
          const product = await getProductById(detail.productId);
          return { ...detail, product };
        })
      );
      setOrderDetails(details);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  const handleShipperAssign = (shipperId) => {
    // Assign shipper logic here
    console.log(
      `Assigning Shipper ID: ${shipperId} to Order ID: ${selectedOrderForShipping.id}`
    );
    setIsShipperAssignModalVisible(false);
    message.success(`Shipper assigned successfully`);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "orderId",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Ngày",
      dataIndex: "createdAt",
      key: "date",
    },
    {
      title: "Trạng thái",
      dataIndex: ["status", "orderStatus1"],
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Pending":
            color = "orange";
            break;
          case "Processing":
            color = "blue";
            break;
          case "Shipped":
            color = "green";
            break;
          case "Delivered":
            color = "cyan";
            break;
          case "Cancelled":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{statusMapping[status] || status}</Tag>;
      },
    },
    {
      title: "Số tiền",
      dataIndex: "total",
      key: "amount",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            <Menu.Item key="view">Xem chi tiết</Menu.Item>
            <Menu.SubMenu key="changeStatus" title="Thay đổi trạng thái">
              <Menu.Item key="Pending">Đang chờ xử lý</Menu.Item>
              <Menu.Item key="Processing">Đang xử lý</Menu.Item>
              <Menu.Item key="Shipped">Đã gửi</Menu.Item>
              <Menu.Item key="Delivered">Đã giao</Menu.Item>
              <Menu.Item key="Cancelled">Hủy bỏ</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="confirmDelivery">Xác nhận giao hàng</Menu.Item>
            {record.status.orderStatus1 === "Processing" && (
              <Menu.Item key="assignShipping">Chỉ định giao hàng</Menu.Item>
            )}
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="default" className="border-0">
              <MoreVertIcon className="w-6 h-6 " />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-4 mx-6 my-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
          <Breadcrumb className="text-gray-600">
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Table
          dataSource={orders}
          columns={columns}
          loading={loading}
          rowKey="id"
        />
      </div>
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Table
          dataSource={orderDetails}
          columns={[
            {
              title: "Tên sản phẩm",
              dataIndex: ["product", "name"],
              key: "name",
            },
            { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
            { title: "Giá", dataIndex: "price", key: "price" },
          ]}
          rowKey="id"
        />
      </Modal>
      <Modal
        title="Chỉ định giao hàng"
        visible={isShipperAssignModalVisible}
        onCancel={() => setIsShipperAssignModalVisible(false)}
        onOk={() => handleShipperAssign(selectedOrderForShipping.id)}
      >
        <Select
          placeholder="Chọn shipper"
          style={{ width: "100%" }}
          onChange={handleShipperAssign}
        >
          {shippers.map((shipper) => (
            <Option key={shipper.id} value={shipper.id}>
              {shipper.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};

export default OrderList;
