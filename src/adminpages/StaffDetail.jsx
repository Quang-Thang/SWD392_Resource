import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
import { message } from "antd";

const StaffDetail = () => {
  const { id } = useParams();
  const formRef = useRef(null);

  const [user, setUser] = useState({
    fullName: "",
    password: "",
    phone: "",
    dob: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://localhost:5000/api/users/staff/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        userData.dob = userData.dob ? userData.dob.split("T")[0] : userData.dob;
        setUser(userData);
        formRef.current.setFieldsValue(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const updateUser = async (updatedUser) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/api/users/staff/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const result = await response.json();
      result.dob = result.dob ? result.dob.split("T")[0] : result.dob;
      setUser(result);
      formRef.current.setFieldsValue(result);
      message.success("Update successful");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    updateUser(values);
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

export default StaffDetail;
