import React, { useState, useEffect } from "react";
import { Input, Button, List, Typography } from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../services/api-service";

export default function Header() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSearchChange = async (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    if (keyword) {
      setSearching(true);
      try {
        const results = await searchProducts(keyword);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="flex justify-between bg-white-100 mx-20">
        <span className="flex justify-between space-x-2">
          <LocationOnIcon />
          Xem tồn kho <strong className="text-blue-600">Miền Nam</strong>
        </span>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <StorefrontOutlinedIcon />
            <span>Hệ thống cửa hàng</span>
          </div>
          <span>
            <LocalPhoneIcon />
            1900 8198
          </span>
        </div>
      </div>

      <div className="bg-[#FFBE51] w-full">
        <div className="flex items-center justify-between mx-20 bg-[#83B4FF] rounded-b-[40px] px-2">
          <Link to="/">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="h-20 w-fit"
            />
          </Link>
          <div className="relative w-96">
            <Input
              placeholder="Tìm kiếm sản phẩm"
              prefix={<SearchIcon />}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full"
            />
            {searching && (
              <div className="absolute top-10 w-full">Đang tìm kiếm...</div>
            )}
            {searchResults.length > 0 && (
              <List
                className="absolute top-10 w-full bg-white shadow-lg z-10"
                bordered
                dataSource={searchResults}
                renderItem={(item) => (
                  <List.Item>
                    <Link
                      to={`/product-detail/${item.id}`}
                      className="flex items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover mr-2"
                      />
                      <Typography.Text>{item.name}</Typography.Text>
                    </Link>
                  </List.Item>
                )}
              />
            )}
          </div>
          <div className="flex items-center space-x-10">
            <Link to="/order-history">
              <Button
                type="text"
                icon={<ListAltOutlinedIcon />}
                className="text-white hover:text-gray-200"
              >
                Đơn hàng
              </Button>
            </Link>
            {user ? (
              <>
                <Link to="/profile">
                  <Button
                    type="text"
                    className="text-white hover:text-gray-200"
                  >
                    Xin chào, {user.name}
                  </Button>
                  <Button
                    type="text"
                    className="text-red-500 hover:text-gray-200"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                      document.location.reload();
                    }}
                  >
                    Đăng xuất
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button
                  type="text"
                  icon={<AccountCircleOutlinedIcon />}
                  className="text-white hover:text-gray-200"
                >
                  Đăng nhập
                </Button>
              </Link>
            )}
            <Link to="/cart">
              <Button
                type="text"
                icon={<ShoppingCartIcon />}
                className="text-white hover:text-gray-200"
              >
                Giỏ hàng
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center mx-20">
          <Link to="/list-product">
            <Button type="text">Mẹ bầu và sau sinh</Button>
          </Link>
          <Button type="text">Sữa cho bé</Button>
          <Button type="text">Bé ăn dặm</Button>
          <Button type="text">Bình sữa và phụ kiện</Button>
          <Button type="text">Combo tiết kiệm</Button>
          <Button type="text">Khuyến mãi hot</Button>
        </div>
      </div>
    </header>
  );
}
