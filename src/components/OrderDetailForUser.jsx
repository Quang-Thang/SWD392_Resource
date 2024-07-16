import { useState, useEffect } from "react";
import { Table } from "antd";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const orderId = id;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "totalPrice",
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!orderDetails) {
    return <p>Order details not found.</p>;
  }

  const data = orderDetails.items.map((item, index) => ({
    key: index.toString(),
    productName: item.productId.name,
    quantity: item.quantity,
    total: `${item.productId.regular_price * item.quantity} VND`,
  }));

  let voucherInfo = null;
  if (orderDetails.voucherId) {
    voucherInfo = {
      key: "voucher",
      productName: "Mã giảm giá",
      quantity: 1,
      total: `-${orderDetails.voucherId.voucher_discount}%`,
    };
  }
  console.log(voucherInfo);
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl justify-center flex w-full font-bold mb-4">
          Chi tiết đơn hàng #{orderDetails._id}
        </h1>
        <Table columns={columns} dataSource={data} pagination={false} />

        <div className="mt-4 p-4 bg-blue-100 rounded-md">
          <p className="text-lg font-bold">
            Tổng tiền đơn hàng: {orderDetails.total} VND
          </p>
          {voucherInfo && (
            <p className="text-lg font-bold mb-2">
              Giảm giá: {voucherInfo.total} (Mã giảm giá:{" "}
              {orderDetails.voucherId.voucherCode})
            </p>
          )}
          <p className="text-base mb-2">
            Số điện thoại: {orderDetails.shippingInfo.phone}
          </p>
          <p className="text-base">
            Địa chỉ giao hàng: {orderDetails.shippingInfo.address}
          </p>
        </div>
      </div>
    </div>
  );
}
