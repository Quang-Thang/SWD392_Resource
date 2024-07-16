import { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          // Handle case where accessToken is not found in localStorage
          console.error("Access token not found");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/orders/history",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Calculate totalQuantity for each order
        const ordersWithTotalQuantity = data.map((order) => {
          // Calculate totalQuantity by summing up quantities of all items
          const totalQuantity = order.items.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          return {
            ...order,
            totalQuantity: totalQuantity,
          };
        });

        setOrders(ordersWithTotalQuantity);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "orderId",
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Completed", value: "Completed" },
        { text: "Pending", value: "Pending" },
        { text: "Processing", value: "Processing" },
        { text: "Cancelled", value: "Cancelled" },
        { text: "Delivered", value: "Delivered" },
        { text: "Delivering", value: "Delivering" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => (
        <span className={getStatusColor(status)}>{status}</span>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "totalPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/order-detail/${record._id}`}>
          <Button type="default">View Detail</Button>
        </Link>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Processing":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      case "Delivered":
        return "text-purple-500";
      case "Delivering":
        return "text-orange-500";
      default:
        return "";
    }
  };

  return (
    <div className="mx-6 p-4 my-4 flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl justify-center flex w-full font-bold mb-4">
        Tất cả đơn hàng
      </h1>
      <Table dataSource={orders} columns={columns} className="w-2/3" />
    </div>
  );
};

export default OrderHistory;
