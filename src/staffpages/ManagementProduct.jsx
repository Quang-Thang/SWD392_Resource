import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  message,
  Breadcrumb,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  getAllProducts,
  updateProduct,
  createProduct,
  getAllCategories,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/api-service";

const { confirm } = Modal;
const { Option } = Select;

const ManagementProduct = () => {
  const [dataSource, setDataSource] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isGiftChecked, setIsGiftChecked] = useState(false);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [categoryForm] = Form.useForm();

  const fetchProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setDataSource(productsData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu danh mục:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const showEditModal = (record) => {
    setEditingProduct(record);
    setIsGiftChecked(record.isGift);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const showCreateModal = () => {
    createForm.resetFields();
    setIsCreateModalVisible(true);
  };

  const showCategoryModal = () => {
    categoryForm.resetFields();
    setIsCategoryModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
    setIsCategoryModalVisible(false);
    setEditingProduct(null);
    setEditingCategory(null);
    setImageUrl(null);
    setIsGiftChecked(false);
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = { ...editingProduct, ...form.getFieldsValue() };
      if (imageUrl) {
        updatedProduct.image = imageUrl;
      }
      const accessToken = localStorage.getItem("accessToken");
      await updateProduct(updatedProduct, accessToken);
      setDataSource((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      message.success("Sản phẩm đã được cập nhật thành công");
      handleCancel();
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      message.error("Không thể cập nhật sản phẩm");
    }
  };

  const handleCreate = async () => {
    try {
      const newProduct = createForm.getFieldsValue();
      if (imageUrl) {
        newProduct.image = imageUrl;
      }
      const accessToken = localStorage.getItem("accessToken");
      await createProduct(newProduct, accessToken);
      message.success("Sản phẩm đã được tạo thành công");
      handleCancel();
      fetchProducts(); // Làm mới danh sách sản phẩm
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      message.error("Không thể tạo sản phẩm");
    }
  };

  const handleCategoryCreate = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const newCategory = categoryForm.getFieldsValue();
      await createCategory(newCategory, accessToken);
      message.success("Danh mục đã được tạo thành công");
      handleCancel();
      fetchCategories(); // Làm mới danh sách danh mục
    } catch (error) {
      console.error("Lỗi khi tạo danh mục:", error);
      message.error("Không thể tạo danh mục");
    }
  };

  const handleCategoryUpdate = async () => {
    try {
      const updatedCategory = {
        ...editingCategory,
        ...categoryForm.getFieldsValue(),
      };
      await updateCategory(updatedCategory);
      setCategories((prev) =>
        prev.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
      message.success("Danh mục đã được cập nhật thành công");
      handleCancel();
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      message.error("Không thể cập nhật danh mục");
    }
  };

  const showDeleteConfirm = (record) => {
    const accessToken = localStorage.getItem("accessToken");
    confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        try {
          await deleteProduct(record.id, accessToken);
          message.success("Sản phẩm đã được xóa thành công");
          setDataSource(
            dataSource.filter((product) => product.id !== record.id)
          );
        } catch (error) {
          console.error("Lỗi khi xóa sản phẩm:", error);
          message.error("Không thể xóa sản phẩm");
        }
      },
      onCancel() {
        console.log("Đã hủy");
      },
    });
  };

  const showCategoryDeleteConfirm = (record) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa danh mục này?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        try {
          await deleteCategory(record.id);
          message.success("Danh mục đã được xóa thành công");
          setCategories(
            categories.filter((category) => category.id !== record.id)
          );
        } catch (error) {
          console.error("Lỗi khi xóa danh mục:", error);
          message.error("Không thể xóa danh mục");
        }
      },
      onCancel() {
        console.log("Đã hủy");
      },
    });
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImageUrl(info.file.response.url); // Assuming the server returns the uploaded file's URL in response
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleIsGiftChange = (e) => {
    setIsGiftChecked(e.target.checked);
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/product-detail/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Có sẵn",
      dataIndex: "isAvailable",
      key: "isAvailable",
    },
    {
      title: "Số lượng bán",
      dataIndex: "quantitySold",
      key: "quantitySold",
    },
    {
      title: "Chỉnh sửa",
      key: "edit",
      render: (text, record) => (
        <Button onClick={() => showEditModal(record)}>Chỉnh sửa</Button>
      ),
    },
    {
      title: "Xóa",
      key: "delete",
      render: (text, record) => (
        <Button type="danger" onClick={() => showDeleteConfirm(record)}>
          Xóa
        </Button>
      ),
    },
  ];

  const categoryColumns = [
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Chỉnh sửa",
      key: "edit",
      render: (text, record) => (
        <Button
          onClick={() => {
            setEditingCategory(record);
            categoryForm.setFieldsValue(record);
            setIsCategoryModalVisible(true);
          }}
        >
          Chỉnh sửa
        </Button>
      ),
    },
    {
      title: "Xóa",
      key: "delete",
      render: (text, record) => (
        <Button type="danger" onClick={() => showCategoryDeleteConfirm(record)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 mx-6 my-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="ml-4 text-2xl font-bold">Tất cả sản phẩm</h1>
          <Breadcrumb className="ml-4 text-gray-600">
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Tất cả sản phẩm</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="flex flex-row gap-2">
          <Button type="primary" onClick={showCreateModal}>
            Tạo sản phẩm
          </Button>
          <Button type="primary" onClick={showCategoryModal}>
            Quản lý danh mục
          </Button>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
      <Modal
        title="Chỉnh sửa sản phẩm"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        onOk={handleUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="discount" label="Giảm giá">
            <Input.Group compact>
              <InputNumber min={0} max={100} style={{ width: "90%" }} />
              <Input
                style={{
                  width: "10%",
                  pointerEvents: "none",
                  backgroundColor: "#f5f5f5",
                }}
                placeholder="%"
                disabled
              />
            </Input.Group>
          </Form.Item>
          <Form.Item name="category" label="Danh mục">
            <Select>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="stock" label="Kho">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="isAvailable" label="Có sẵn">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="quantitySold" label="Số lượng bán">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Upload
              name="image"
              action="http://localhost:9999/upload" // Change this to your actual upload URL
              listType="picture"
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="isPreorder"
            label="Đặt hàng trước"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item name="isGift" label="Quà tặng" valuePropName="checked">
            <Checkbox onChange={handleIsGiftChange} />
          </Form.Item>
          <Form.Item name="giftPoint" label="Điểm quà tặng">
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              disabled={isGiftChecked}
            />
          </Form.Item>
          <Form.Item name="capacity" label="Dung tích">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="origin" label="Xuất xứ">
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Thương hiệu">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Độ tuổi">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="size" label="Kích thước">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Tạo sản phẩm"
        visible={isCreateModalVisible}
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item name="name" label="Tên">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="discount" label="Giảm giá">
            <Input.Group compact>
              <InputNumber min={0} max={100} style={{ width: "90%" }} />
              <Input
                style={{
                  width: "10%",
                  pointerEvents: "none",
                  backgroundColor: "#f5f5f5",
                }}
                placeholder="%"
                disabled
              />
            </Input.Group>
          </Form.Item>
          <Form.Item name="category" label="Danh mục">
            <Select>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="stock" label="Kho">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="isAvailable" label="Có sẵn">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="quantitySold" label="Số lượng bán">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Upload
              name="image"
              action="http://localhost:9999/upload" // Change this to your actual upload URL
              listType="picture"
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="isPreorder"
            label="Đặt hàng trước"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item name="isGift" label="Quà tặng" valuePropName="checked">
            <Checkbox onChange={handleIsGiftChange} />
          </Form.Item>
          <Form.Item name="giftPoint" label="Điểm quà tặng">
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              disabled={isGiftChecked}
            />
          </Form.Item>
          <Form.Item name="capacity" label="Dung tích">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="origin" label="Xuất xứ">
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Thương hiệu">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Độ tuổi">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="size" label="Kích thước">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Quản lý danh mục"
        visible={isCategoryModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Table dataSource={categories} columns={categoryColumns} rowKey="id" />
        <Form
          form={categoryForm}
          layout="vertical"
          onFinish={
            editingCategory ? handleCategoryUpdate : handleCategoryCreate
          }
        >
          <Form.Item name="categoryName" label="Tên danh mục">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingCategory ? "Cập nhật danh mục" : "Tạo danh mục"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagementProduct;
