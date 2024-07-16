import React, { useEffect, useState } from "react";
import { Form, Input, Button, Popover, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const StaffProfile = () => {
  const [user, setUser] = useState({});
  const [passwordPopoverVisible, setPasswordPopoverVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        message.error("No access token found. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/current",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser({
            id: data._id,
            fullName: data.fullName,
            phone_number: data.phone_number,
            email: data.email,
          });
          form.setFieldsValue({
            fullName: data.fullName,
            phone_number: data.phone_number,
            email: data.email,
          });
        } else {
          alert("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching user data");
      }
    };

    fetchUserData();
  }, [form, navigate]);

  const handleProfileSubmit = async (values) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = user.id; // Ensure the user ID is stored in the user state
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Profile updated successfully");
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating profile");
    }
  };

  const handlePasswordSubmit = async (values) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = user.id; // Ensure the user ID is stored in the user state

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/changePassword/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Password changed successfully");
        setPasswordPopoverVisible(false); // Close the popover after submitting
      } else {
        message.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing password");
    }
  };

  const changePasswordContent = (
    <Form onFinish={handlePasswordSubmit}>
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[
          { required: true, message: "Please input your current password!" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[
          { required: true, message: "Please confirm your new password!" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Card className="container mx-auto my-20">
      <h1 className="flex items-center justify-center text-2xl font-bold w-full mb-10">
        User Profile
      </h1>
      <div className="flex justify-center w-full h-auto space-x-20">
        <img
          src="../assets/images/user.png"
          className="rounded-full w-72"
          alt="User"
        />
        <Form form={form} initialValues={user} onFinish={handleProfileSubmit}>
          <Form.Item name="fullName" label="Name">
            <Input className="w-full" />
          </Form.Item>
          <Form.Item name="phone_number" label="Phone">
            <Input className="w-full" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input className="w-full" />
          </Form.Item>
          <Popover
            content={changePasswordContent}
            title="Change Password"
            trigger="click"
            open={passwordPopoverVisible}
            onOpenChange={(visible) => setPasswordPopoverVisible(visible)}
          >
            <Button type="link" className="mt-4">
              Change Password
            </Button>
          </Popover>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mt-4">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default StaffProfile;
