import React, { useState, useEffect } from "react";
import { Table, Button, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "regular_price",
      key: "price",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      sortOrder: sortedInfo.columnKey === "stock" && sortedInfo.order,
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Link to={`/staff/update-product/${product._id}`}>
          <MoreVertIcon className="h-6 w-6 " />
        </Link>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">All Products</h1>
          <Breadcrumb className="text-gray-600 ml-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Products</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button type="primary" className="bg-black text-white mr-2">
          <Link to="/staff/add-product">+ ADD NEW PRODUCT</Link>
        </Button>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={products}
        rowKey="id"
        onChange={handleChange}
      />
    </div>
  );
};

export default ProductList;
