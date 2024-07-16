import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
import { message } from "antd";

const UserDetail = () => {
  const formRef = useRef(null);
  const { id } = useParams();

  const [userData, setUserData] = useState({
    fullName: "",
    password: "",
    phone_number: "",
    dob: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const fetchedUserData = await response.json();
        fetchedUserData.dob = fetchedUserData.dob
          ? fetchedUserData.dob.split("T")[0]
          : fetchedUserData.dob;
        setUserData(fetchedUserData);
        setUserData(fetchedUserData);
        formRef.current.setFieldsValue(fetchedUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const onFinish = async (values) => {
    try {
      const { fullName, phone_number, dob, email, gender } = values;

      // Gọi API PUT để cập nhật thông tin người dùng
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phone_number,
          dob,
          email,
          gender,
        }),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        updatedUserData.dob = updatedUserData.dob
          ? updatedUserData.dob.split("T")[0]
          : updatedUserData.dob;
        setUserData(updatedUserData);
        message.success("Update successful");
      } else {
        const errorData = await response.json();
        throw new Error("Failed to update user: " + errorData.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Form
      className="my-10 mx-10"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      ref={formRef}
    >
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password className="w-1/2" disabled />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone_number"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[{ required: true, message: "Please enter your date of birth" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select your gender" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="w-1/2">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserDetail;
