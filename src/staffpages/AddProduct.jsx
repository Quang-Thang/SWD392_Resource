import { useState } from "react";
import { Breadcrumb, Button, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Card } from "antd";

const { TextArea } = Input;
const { Dragger } = Upload;

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    SKU: "",
    stock: "",
    regular_price: "",
    sale_price: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = (info) => {
    const { file } = info;
    if (file.status === "done" || file.status === "uploading") {
      if (file.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          setImagePreview(reader.result);
          setProductData({ ...productData, image: file.originFileObj });
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

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        message.success("Product added successfully");
        // Reset form
        setProductData({
          name: "",
          description: "",
          category: "",
          brand: "",
          SKU: "",
          stock: "",
          regular_price: "",
          sale_price: "",
          image: null,
        });
        setImagePreview(null);
      } else {
        const errorData = await response.json();
        message.error(`Error adding product: ${errorData.message}`);
      }
    } catch (error) {
      message.error("Error adding product");
    }
  };

  return (
    <Card className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <Breadcrumb className="text-gray-600">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>All Products</Breadcrumb.Item>
          <Breadcrumb.Item>Add New Product</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <Input
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              placeholder="Type product's name here"
              className="mb-4"
            />

            <label className="block text-gray-700">Description</label>
            <TextArea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              placeholder="Type Description here"
              rows={2}
              className="mb-4"
            />

            <label className="block text-gray-700">Category</label>
            <Input
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              placeholder="Type category here"
              className="mb-4"
            />

            <label className="block text-gray-700">Brand Name</label>
            <Input
              name="brand"
              value={productData.brand}
              onChange={handleInputChange}
              placeholder="Type brand name here"
              className="mb-4"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">SKU</label>
                <Input
                  name="SKU"
                  value={productData.SKU}
                  onChange={handleInputChange}
                  placeholder="123-456"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Stock Quantity</label>
                <Input
                  name="stock"
                  value={productData.stock}
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
                  value={productData.regular_price}
                  onChange={handleInputChange}
                  placeholder="$"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Sale Price</label>
                <Input
                  name="sale_price"
                  value={productData.sale_price}
                  onChange={handleInputChange}
                  placeholder="$"
                  className="mb-4"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-full object-contain"
                />
              ) : (
                <span>Image Preview</span>
              )}
            </div>
            <div className="mt-4">
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
          <Button
            type="primary"
            className="bg-green-500"
            onClick={handleSubmit}
          >
            ADD NEW PRODUCT
          </Button>
          <Button>Cancel</Button>
        </div>
      </div>
    </Card>
  );
};

export default AddProduct;
