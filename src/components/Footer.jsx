// import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { QRCode } from "antd";
import { Input, Button } from "antd";

export default function Footer() {
  return (
    <>
      <Box className="bg-[#00AEEF] text-white py-4">
        <Container>
          <div className="flex space-x-10">
            <div className="flex-col space-y-4 my-4">
              <div className="flex items-center space-x-20">
                <Typography>Tư vấn khách hàng</Typography>
                <Typography>
                  <PhoneIcon /> 1800.xxxx
                </Typography>
                <Typography>(8h00 - 21h00)</Typography>
              </div>
              <Divider sx={{ borderColor: "white", width: "600px" }} />
              <div className="flex items-center space-x-20">
                <Typography>Tư vấn khách hàng</Typography>
                <Typography>
                  <PhoneIcon /> 1800.xxxx
                </Typography>
                <Typography>(8h00 - 21h00)</Typography>
              </div>
            </div>

            <div>
              <Typography variant="h6" gutterBottom className="mr-4">
                Nhận tin khuyến mãi & quà
              </Typography>
              <div className="flex space-x-2">
                <Input
                  placeholder="Nhập địa chỉ giao hàng"
                  suffix={<Button>ĐĂNG KÝ</Button>}
                />
              </div>
            </div>
          </div>
        </Container>
      </Box>

      <Box className="bg-white text-black py-8">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <Typography variant="h7" className="text-[#00AEEF] mb-4">
                VỀ BEBÉ
              </Typography>
              <Typography>Giới thiệu KidsPlaza</Typography>
              <Typography>Danh sách cửa hàng</Typography>
              <Typography>Báo chí nói về chúng tôi</Typography>
              <Typography>Kiến thức nuôi con</Typography>
              <Typography>Tuyển dụng</Typography>
              <Typography>Chính sách bảo mật</Typography>
              <span className="text-[#00AEEF]">Xem thêm</span>
            </div>
            <div className="space-y-2">
              <Typography variant="h7" className="text-[#00AEEF] mb-4">
                CHĂM SÓC KHÁCH HÀNG
              </Typography>
              <Typography>Quy định đổi trả hàng</Typography>
              <Typography>Phương thức thanh toán</Typography>
              <Typography>Phương thức giao hàng</Typography>
              <Typography>Lớp học tiền sản miễn phí</Typography>
              <Typography>Lớp học ăn dặm miễn phí</Typography>
              <Typography>Gửi góp ý / Khiếu nại</Typography>
              <Typography>Chính sách bảo hành</Typography>
              <Typography>Câu hỏi thường gặp</Typography>
              <span className="text-[#00AEEF]">Xem thêm</span>
            </div>
            <div className="space-y-2">
              <Typography variant="h7" className="text-[#00AEEF] mb-4">
                THANH TOÁN
              </Typography>
              <Box className="flex flex-wrap">
                <img
                  src="./public/assets/images/Visa-logo.png"
                  alt="Visa"
                  className="w-16 h-10 m-1"
                />
                <img
                  src="./public/assets/images/MasterCard-logo.png"
                  alt="MasterCard"
                  className="w-16 h-10 m-1"
                />
                <img
                  src="./public/assets/images/Logo-VNPAY-QR.png"
                  alt="VNPay"
                  className="w-16 h-10 m-1"
                />
                <img
                  src="./public/assets/images/JCB-logo.png"
                  alt="JCB"
                  className="w-16 h-10 m-1"
                />
              </Box>
            </div>
            <div className="space-y-2">
              <Typography variant="h7" className="text-[#00AEEF] mb-4">
                VẬN CHUYỂN
              </Typography>
              <Box className="flex flex-wrap">
                <img
                  src="./public/assets/images/GHN-Logo.png"
                  alt="GHN"
                  className="w-16 h-10 m-1"
                />
                <img
                  src="./public/assets/images/GHTK-logo.png"
                  alt="GHTK"
                  className="w-16 h-10 m-1"
                />
              </Box>
            </div>
          </div>
        </Container>
      </Box>

      <Box className="bg-gray-100 text-black py-4">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <Typography variant="body2">
                Bản quyền © 2024 BEBÉ - Hệ thống cửa hàng Mẹ Bầu và Em Bé BEBÉ.
              </Typography>
              <Typography variant="body2">
                Đơn vị chủ quản: Công ty Cổ phần BEBÉ
              </Typography>
              <Typography variant="body2">
                Địa chỉ: 20 Thái Thịnh, P. Ngã Tư Sở, Đống Đa, Hà Nội.
              </Typography>
              <Typography variant="body2">
                Điện thoại: (024) XXXXXX - Email: contact@bebe.vn
              </Typography>
            </div>
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src="./public/assets/images/GOV.png"
                alt="Bộ Công Thương"
                className="h-12"
              />
            </div>
            <div className="flex flex-col items-center md:items-end">
              <Typography variant="h7" className="text-[#002278] mb-2">
                KẾT NỐI VỚI CHÚNG TÔI
              </Typography>
              <div className="flex space-x-[27px]">
                <FacebookIcon className="text-blue-600" />
                <TwitterIcon className="text-blue-400" />
                <YouTubeIcon className="text-red-600" />
                <InstagramIcon className="text-red-600" />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <Typography variant="h7" className="text-[#002278] mb-2">
                TẢI APP NHẬN NGAY ƯU ĐÃI
              </Typography>
              <div className="flex">
                <div>
                  <QRCode
                    type="canvas"
                    value="https://ant.design/"
                    size={100}
                  />
                </div>
                <div className="space-y-4">
                  <img
                    src="./public/assets/images/app-store-logo.png"
                    alt="App Store"
                    className="w-32 h-10"
                  />
                  <img
                    src="./public/assets/images/app-store-logo.png"
                    alt="Google Play"
                    className="w-32 h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </>
  );
}
