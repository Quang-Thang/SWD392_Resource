import React, { useState } from "react";
import { Input, Button, DatePicker, Radio } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api-service";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(true);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register({
        email,
        password,
        fullname,
        birthday,
        address,
        gender,
        phone,
      });
      toast.success("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Đăng ký thất bại");
    }
  };

  return (
    <div className="px-20 my-10 bg-white">
      <div className="flex justify-center items-center">
        <img
          className="absolute z-0 top-[180px]"
          src="./public/assets/images/image 83.png"
          alt="register"
        />
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100 ">
        <div className="bg-white rounded-lg shadow-lg w-1/3 z-10">
          <div className="flex">
            <Link
              to="/login"
              className="w-1/2 text-center py-6 bg-gray-200 rounded-s-md"
            >
              <h2 className="text-2xl font-bold text-blue-900">ĐĂNG NHẬP</h2>
            </Link>
            <div className="w-1/2 text-center py-6 bg-yellow-400 rounded-e-md">
              <h2 className="text-2xl font-bold text-blue-900">ĐĂNG KÝ</h2>
            </div>
          </div>
          <div className="mx-12 my-8 w-5/6">
            <Input
              className="mb-4"
              placeholder="Email"
              type="email"
              size="large"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              className="mb-4"
              placeholder="Mật khẩu"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              className="mb-4"
              placeholder="Họ và tên"
              size="large"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <DatePicker
              className="mb-4 w-full"
              placeholder="Ngày sinh"
              size="large"
              value={birthday}
              onChange={(date) => setBirthday(date)}
            />
            <Input
              className="mb-4"
              placeholder="Địa chỉ"
              size="large"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Radio.Group
              className="mb-4"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
            <Input
              className="mb-4"
              placeholder="Số điện thoại"
              size="large"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              type="primary"
              className="w-full bg-blue-500 text-white font-bold py-2 rounded"
              size="large"
              onClick={handleRegister}
            >
              ĐĂNG KÝ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;