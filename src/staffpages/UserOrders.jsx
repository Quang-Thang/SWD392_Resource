import { useState, useEffect } from "react";
import { Table, Input } from "antd";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    const response = await fetch("/api/user/orders");
    const data = await response.json();
    setOrders(data);
  };

  const fakeData = [
    {
      id: 1,
      product: "Product 1",
      quantity: 2,
      price: "$10",
    },
    {
      id: 2,
      product: "Product 2",
      quantity: 3,
      price: "$15",
    },
  ];

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <div className="mx-6 p-4 my-6">
      <div className="flex flex-col justify-start space-y-2 mb-6">
        <p>Total Points: </p>
        <Input
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          placeholder="Total Points"
          readOnly
          className="w-1/4"
        />
      </div>
      <Table columns={columns} dataSource={fakeData} rowKey="id" />
    </div>
  );
};

export default UserOrders;
