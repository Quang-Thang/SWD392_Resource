import React, { useState, useEffect } from "react";
import { Input, Dropdown, Menu, Button, Badge, message } from "antd";
import { SearchOutlined, UserOutlined, BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;

const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      localStorage.clear();
      message.success("Logged out successfully");

      window.location.href = "/login";
    } else {
      message.error("Failed to logout");
    }
  } catch (error) {
    message.error("An error occurred during logout");
  }
};

const Headerv3 = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      try {
        const parsedRole = JSON.parse(storedRole);
        setRole(parsedRole.name);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to={"/admin/profile"}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#settings">Settings</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-end items-center p-4 bg-white shadow-md h-24 w-full sticky right-0">
      <Search
        placeholder="Search"
        onSearch={(value) => console.log(value)}
        style={{ width: 200 }}
        className="mr-4"
        prefix={<SearchOutlined />}
      />
      <Badge count={5} className="mr-4">
        <BellOutlined style={{ fontSize: "20px" }} />
      </Badge>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          className="ant-dropdown-link flex items-center"
          onClick={(e) => e.preventDefault()}
        >
          <UserOutlined style={{ fontSize: "20px", marginRight: "8px" }} />
          <span>ADMIN</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default Headerv3;
