import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const ManagementUser = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setDataSource(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Detail",
      key: "detail",
      render: (record) => (
        <Link to={`/staff/management-user/user-detail/${record._id}`}>
          Detail
        </Link>
      ),
    },
    {
      title: "Order",
      key: "order",
      render: (record) => (
        <Link to={`/staff/management-user/user-orders/${record._id}`}>
          View Order
        </Link>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">All Customers</h1>
          <Breadcrumb className="text-gray-600 ml-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Customers</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ManagementUser;
