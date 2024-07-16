import { Menu } from "antd";
import { DashboardOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SideBarv2 = () => {
  return (
    <div className="h-screen w-[15%] bg-white shadow-md sticky top-0 left-0">
      <div className="flex items-center justify-center py-4 w-full h-32">
        <Link to="/admin/dashboard">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="h-42 w-fit"
          />
        </Link>
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]} className="border-r-0">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/admin/dashboard">Bảng điều khiển</Link>
        </Menu.Item>

        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/admin/management-staff">Quản lý nhân viên</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBarv2;
