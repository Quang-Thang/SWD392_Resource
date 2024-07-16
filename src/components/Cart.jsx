import { useState, useEffect } from "react";
import { Button, InputNumber, Input, Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../features/cart/CartSlice";
import { message } from "antd";
import {
  getUserCart,
  getProductById,
  removeItemsFromCart,
  updateCart,
} from "../services/api-service";
import { toast } from "react-toastify";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  const reduxCartItems = useSelector((state) => state.cart.items);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    try {
      const accountId = localStorage.getItem("accountId"); // Assuming accountId is stored in localStorage
      if (!accountId) {
        throw new Error("User not authenticated");
      }
      const cartData = await getUserCart(accountId);
      const productDetails = await Promise.all(
        cartData.map(async (item) => {
          const product = await getProductById(item.productId);
          return { ...item, product };
        })
      );
      setCartItems(productDetails);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchCartItems();
    } else {
      setCartItems(reduxCartItems);
    }
  }, [reduxCartItems]);

  const handleQuantityChange = async (value, itemId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const updatedCartItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: value } : item
        );
        await updateCart(updatedCartItems);
        fetchCartItems(); // Refresh cart items after updating quantity
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      dispatch(updateQuantity({ id: itemId, quantity: value }));
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("This is itemID: " + itemId);
    try {
      const res = await axios.post(
        `https://swdprojectapi.azurewebsites.net/api/carts/remove-items-in-cart`,
        [itemId]
      );
      console.log(res);
    } catch (error) {
      console.log("Error at remove item :", error);
    }
    if (accessToken) {
      try {
        await removeItemsFromCart(itemId);
        fetchCartItems();
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      } catch (error) {
        console.error("Error removing item:", error);
        toast.error("Lỗi xóa sản phẩm khỏi giỏ hàng");
      }
    } else {
      dispatch(removeFromCart(itemId));
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    }
  };

  const handleCheckout = () => {
    console.log("Proceed to checkout");
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="flex flex-col items-center w-11/12 mx-auto my-10">
      <div className="flex w-11/12 my-10 space-x-4 bg-white-100">
        <Card className="w-full p-4 bg-white rounded-lg shadow-md md:w-2/3">
          <h2 className="mb-4 text-xl font-bold text-blue-500">Giỏ hàng</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div className="flex flex-col">
                  <span className="font-bold text-blue-500">Sản phẩm</span>
                  <div className="flex">
                    <img
                      src={item.product?.image}
                      alt={item.product.name}
                      className="object-cover w-20 h-20 mr-4"
                    />
                    <h3 className="text-lg font-semibold">
                      {item.product.name}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-blue-500">Giá</span>
                  {item.product.discount > 0 ? (
                    <p className="mr-4 font-bold text-red-500">
                      {item.product.onDiscountPrice} VND
                    </p>
                  ) : (
                    <p className="mr-4 font-bold text-red-500">
                      {item.product.price} VND
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-blue-500">Số lượng</span>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(value, item.id)}
                    className="mr-4"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-blue-500">Tạm tính</span>
                  {item.product.discount > 0 ? (
                    <p className="mr-4 font-bold text-red-500">
                      {(
                        item.product.onDiscountPrice * item.quantity
                      ).toLocaleString("vi-VN")}
                      VND
                    </p>
                  ) : (
                    <p className="mr-4 font-bold text-red-500">
                      {(item.product.price * item.quantity).toLocaleString(
                        "vi-VN"
                      )}
                      VND
                    </p>
                  )}
                </div>
                <Button
                  type="link"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Xóa
                </Button>
              </div>
            ))
          ) : (
            <div>Không có sản phẩm nào trong giỏ hàng</div>
          )}
        </Card>
        <div className="flex flex-col space-y-4">
          <Card className="w-full p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <span>Tổng giá sản phẩm</span>
                <span>{getTotalPrice().toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>0đ</span>
              </div>
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-bold text-red-500">
                  {getTotalPrice().toLocaleString("vi-VN")}đ
                </span>
              </div>
              <Link to="/payment">
                <Button
                  to="/payment"
                  type="primary"
                  onClick={handleCheckout}
                  className="w-full"
                >
                  Tiến hành thanh toán
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
