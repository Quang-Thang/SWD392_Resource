import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, DatePicker, Form, message } from "antd";
import "tailwindcss/tailwind.css";
import dayjs from "dayjs";

const { TextArea } = Input;

const ManagementVoucher = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [voucherData, setVoucherData] = useState([]);

  useEffect(() => {
    fetchVouchers();
  }, []);
  const accessToken = localStorage.getItem("accessToken");
  const fetchVouchers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vouchers", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setVoucherData(
        data.map((voucher) => ({
          ...voucher,
          key: voucher._id,
          startDay: dayjs(voucher.startDay).format("YYYY-MM-DD"),
          endDay: dayjs(voucher.endDay).format("YYYY-MM-DD"),
        }))
      );
    } catch (error) {
      message.error("Failed to fetch vouchers");
    }
  };

  const addVoucher = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/vouchers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...values,
          startDay: values.startDay.format("YYYY-MM-DD"),
          endDay: values.endDay.format("YYYY-MM-DD"),
        }),
      });

      if (response.ok) {
        const newVoucher = await response.json();
        setVoucherData([
          ...voucherData,
          { ...newVoucher, key: newVoucher._id },
        ]);
        message.success("Voucher added successfully");
      } else {
        message.error("Failed to add voucher");
      }
    } catch (error) {
      message.error("Failed to add voucher");
    }
  };

  const updateVoucher = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/vouchers/${selectedVoucher._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            ...selectedVoucher,
            startDay: dayjs(selectedVoucher.startDay).format("YYYY-MM-DD"),
            endDay: dayjs(selectedVoucher.endDay).format("YYYY-MM-DD"),
          }),
        }
      );

      if (response.ok) {
        const updatedVoucherData = voucherData.map((voucher) =>
          voucher._id === selectedVoucher._id ? selectedVoucher : voucher
        );
        setVoucherData(updatedVoucherData);
        message.success("Voucher updated successfully");
      } else {
        message.error("Failed to update voucher");
      }
    } catch (error) {
      message.error("Failed to update voucher");
    }
  };

  const deleteVoucher = async (key) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/vouchers/${key}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const updatedVoucherData = voucherData.filter(
          (voucher) => voucher.key !== key
        );
        setVoucherData(updatedVoucherData);
        message.success("Voucher deleted successfully");
      } else {
        message.error("Failed to delete voucher");
      }
    } catch (error) {
      message.error("Failed to delete voucher");
    }
  };

  const handleAddOk = (values) => {
    setIsAddModalVisible(false);
    addVoucher(values);
  };

  const handleEditOk = () => {
    setIsModalVisible(false);
    if (selectedVoucher) {
      updateVoucher();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAddModalVisible(false);
  };

  const handleInputChange = (e, field) => {
    setSelectedVoucher({
      ...selectedVoucher,
      [field]: e.target.value,
    });
  };

  const handleDateChange = (date, field) => {
    setSelectedVoucher((prevVoucher) => ({
      ...prevVoucher,
      [field]: date ? dayjs(date).format("YYYY-MM-DD") : "",
    }));
  };

  const showEditModal = (voucher) => {
    setSelectedVoucher({ ...voucher });
    setIsModalVisible(true);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleDelete = (key) => {
    deleteVoucher(key);
  };

  const voucherColumns = [
    {
      title: "Voucher Code",
      dataIndex: "voucherCode",
      key: "voucherCode",
    },
    {
      title: "Voucher Name",
      dataIndex: "voucherName",
      key: "voucherName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Day",
      dataIndex: "startDay",
      key: "startDay",
    },
    {
      title: "End Day",
      dataIndex: "endDay",
      key: "endDay",
    },
    {
      title: "Discount (%)",
      dataIndex: "voucher_discount",
      key: "voucher_discount",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="space-x-2">
          <Button type="primary" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Vouchers</h1>
        <Button
          type="primary"
          className="mb-4 text-white"
          onClick={showAddModal}
        >
          + ADD NEW VOUCHER
        </Button>
      </div>
      <Table dataSource={voucherData} columns={voucherColumns} />

      <Modal
        title="Edit Voucher"
        visible={isModalVisible}
        onOk={handleEditOk}
        onCancel={handleCancel}
      >
        {selectedVoucher && (
          <Form layout="vertical">
            <Form.Item label="Voucher Code">
              <Input value={selectedVoucher.voucherCode} disabled />
            </Form.Item>
            <Form.Item label="Voucher Name">
              <Input
                value={selectedVoucher.voucherName}
                onChange={(e) => handleInputChange(e, "voucherName")}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                rows={3}
                value={selectedVoucher.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </Form.Item>
            <Form.Item label="Start Day">
              <DatePicker
                className="w-full"
                value={dayjs(selectedVoucher.startDay)}
                onChange={(date) => handleDateChange(date, "startDay")}
              />
            </Form.Item>
            <Form.Item label="End Day">
              <DatePicker
                className="w-full"
                value={dayjs(selectedVoucher.endDay)}
                onChange={(date) => handleDateChange(date, "endDay")}
              />
            </Form.Item>
            <Form.Item label="Discount (%)">
              <Input
                value={selectedVoucher.voucher_discount}
                onChange={(e) => handleInputChange(e, "voucher_discount")}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        title="Add New Voucher"
        visible={isAddModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddOk}>
          <Form.Item
            label="Voucher Code"
            name="voucherCode"
            rules={[
              { required: true, message: "Please input the voucher code!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Voucher Name"
            name="voucherName"
            rules={[
              { required: true, message: "Please input the voucher name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Start Day"
            name="startDay"
            rules={[
              { required: true, message: "Please select the start day!" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="End Day"
            name="endDay"
            rules={[{ required: true, message: "Please select the end day!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="Discount (%)"
            name="voucher_discount"
            rules={[{ required: true, message: "Please input the discount!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="text-white">
              Add Voucher
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagementVoucher;
