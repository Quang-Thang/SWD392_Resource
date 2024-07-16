import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  message,
  Form,
  Input,
  DatePicker,
  Select,
  Breadcrumb,
} from "antd";
import { getAccounts, updateAccount } from "../services/api-service";
import moment from "moment";

const { Option } = Select;

const ManagementStaff = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const params = { page: 1, size: 100 }; // Ví dụ: Lấy 100 bản ghi mỗi trang
        const body = {
          isActive: true,
          nameOrEmailSearchKeyWord: "",
        };
        const accountData = await getAccounts(params, body);

        // Lọc tài khoản có roleId = 3
        const staffData = accountData.accounts;

        // Định dạng ngày sinh chỉ bao gồm ngày
        const formattedStaffData = staffData.map((staff) => ({
          ...staff,
          birthday: staff.birthday
            ? staff.birthday.split("T")[0]
            : staff.birthday,
        }));

        setDataSource(formattedStaffData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
      }
    };

    fetchStaffs();
  }, []);

  const showEditModal = (record) => {
    setEditingAccount(record);
    form.setFieldsValue({
      ...record,
      birthday: record.birthday ? moment(record.birthday) : null,
    });
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setEditingAccount(null);
  };

  const handleUpdate = async () => {
    try {
      const updatedAccount = { ...editingAccount, ...form.getFieldsValue() };
      await updateAccount(updatedAccount);
      setDataSource((prev) =>
        prev.map((account) =>
          account.id === updatedAccount.id ? updatedAccount : account
        )
      );
      message.success("Cập nhật tài khoản thành công");
      handleCancel();
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
      message.error("Cập nhật tài khoản thất bại");
    }
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (text) => (text ? "Nam" : "Nữ"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Chỉnh sửa",
      key: "edit",
      render: (text, record) => (
        <Button onClick={() => showEditModal(record)}>Chỉnh sửa</Button>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">Tất cả nhân viên</h1>
          <Breadcrumb className="text-gray-600 ml-4">
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Tất cả nhân viên</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
      <Modal
        title="Chỉnh sửa tài khoản"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        onOk={handleUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="fullname" label="Tên đầy đủ">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password />
          </Form.Item>
          <Form.Item name="birthday" label="Ngày sinh">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="Trạng thái">
            <Select>
              <Option value={true}>Hoạt động</Option>
              <Option value={false}>Không hoạt động</Option>
            </Select>
          </Form.Item>
          <Form.Item name="gender" label="Giới tính">
            <Select>
              <Option value={true}>Nam</Option>
              <Option value={false}>Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagementStaff;
