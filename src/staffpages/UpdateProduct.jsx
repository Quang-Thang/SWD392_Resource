import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Input,
  Card,
  Upload,
  message,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
        if (data.image) {
          setImagePreview(`http://localhost:5000/${data.image}`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageUpload = (info) => {
    const { file } = info;
    if (file.status === "done" || file.status === "uploading") {
      if (file.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          setImagePreview(reader.result);
          setProduct({ ...product, image: file.originFileObj });
        };
      } else {
        message.error("You can only upload PNG files!");
      }
    }
  };

  const beforeUpload = (file) => {
    const isPng = file.type === "image/png";
    if (!isPng) {
      message.error("You can only upload PNG files!");
    }
    return isPng;
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }
      const accessToken = localStorage.getItem("accessToken");

      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      message.success("Product updated successfully");
      navigate("/staff/all-products");
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Error updating product");
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      message.success("Product deleted successfully");
      navigate("/staff/all-products");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Error deleting product");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Card className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <Breadcrumb className="text-gray-600">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>All Products</Breadcrumb.Item>
          <Breadcrumb.Item>Update Product</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <Input
              name="name"
              value={product.name || ""}
              onChange={handleInputChange}
              placeholder="Type product's name here"
              className="mb-4"
            />

            <label className="block text-gray-700">Description</label>
            <TextArea
              name="description"
              value={product.description || ""}
              onChange={handleInputChange}
              placeholder="Type Description here"
              rows={2}
              className="mb-4"
            />

            <label className="block text-gray-700">Category</label>
            <Input
              name="category"
              value={product.category || ""}
              onChange={handleInputChange}
              placeholder="Type category here"
              className="mb-4"
            />

            <label className="block text-gray-700">Brand Name</label>
            <Input
              name="brand"
              value={product.brand || ""}
              onChange={handleInputChange}
              placeholder="Type brand name here"
              className="mb-4"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">SKU</label>
                <Input
                  name="SKU"
                  value={product.SKU || ""}
                  onChange={handleInputChange}
                  placeholder="123-456"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Stock Quantity</label>
                <Input
                  name="stock"
                  value={product.stock || ""}
                  onChange={handleInputChange}
                  placeholder=""
                  className="mb-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Regular Price</label>
                <Input
                  name="regular_price"
                  value={product.regular_price || ""}
                  onChange={handleInputChange}
                  placeholder="$"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Sale Price</label>
                <Input
                  name="sale_price"
                  value={product.sale_price || ""}
                  onChange={handleInputChange}
                  placeholder="$"
                  className="mb-4"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Discount</label>
                <Input
                  name="discount"
                  value={product.discount || ""}
                  onChange={handleInputChange}
                  placeholder="%"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Discount</label>
                <RangePicker className="w-full" />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-4">
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <img
                    src="https://i.pinimg.com/564x/02/49/98/024998a77547072bda7d81bc688be196.jpg"
                    alt="Image Preview"
                    className="h-full object-contain"
                  />
                )}
              </div>
              <label className="block text-gray-700">Product Gallery</label>
              <Dragger
                name="files"
                accept=".png"
                className="mb-4"
                beforeUpload={beforeUpload}
                onChange={handleImageUpload}
                showUploadList={false}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Drop your image here, or browse
                </p>
                <p className="ant-upload-hint">Only png are allowed</p>
              </Dragger>
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-4 mt-6">
          <div className="flex items-start space-x-6">
            <Button type="primary" onClick={handleUpdate}>
              UPDATE PRODUCT
            </Button>
            <Button type="primary" danger onClick={handleDelete}>
              DELETE PRODUCT
            </Button>
          </div>

          <Button onClick={() => navigate("/staff/all-products")}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UpdateProduct;
