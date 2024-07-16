import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Payment from "./components/Payment";
import ProductDetail from "./components/ProductDetail";
import Register from "./components/Register";
import Home from "./components/Home";
import ListProduct from "./components/ListProduct";
import Login from "./components/Login";
import SideBar from "./staffpages/SideBar";
import Headerv2 from "./staffpages/Headerv2";
import DashBoard from "./staffpages/DashBoard";
import AllProduct from "./staffpages/AllProduct";
import AddProduct from "./staffpages/AddProduct";
import UpdateProduct from "./staffpages/UpdateProduct";
import ManagementUser from "./staffpages/ManagementUser";
import UserDetail from "./staffpages/UserDetail";
import UserOrders from "./staffpages/UserOrders";
import OrderList from "./staffpages/OrderList";
import OrderDetail from "./staffpages/OrderDetail";
import UserProfile from "./components/Profile";
import SideBarv2 from "./adminpages/SideBarv2";
import ManagementStaff from "./adminpages/ManagementStaff";
import StaffDetail from "./adminpages/StaffDetail";
import StaffProfile from "./staffpages/StaffProfile";
import OrderDetails from "./components/OrderDetailForUser";
import OrderHistory from "./components/OrderHistory";
import Headerv3 from "./adminpages/Headerv3";
import ManagementProduct from "./staffpages/ManagementProduct";
import ManagementOrder from "./staffpages/ManagementOrder";
import ManageTakeCare from "./staffpages/ManageTakeCare";
import Chatbox from './components/Chatbox';

function App() {
  // Function to check if the user role is member
  const isMember = () => {
    const role = localStorage.getItem('role');
    return role && JSON.parse(role).name === 'member';
  };
  return (
    <>
      <Router>
        {/* Routes for regular users */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                {isMember() && <Chatbox />}
                <Footer />
              </>
            }
          />
          <Route
            path="/list-product"
            element={
              <>
                <Header />
                <ListProduct />
                {isMember() && <Chatbox />}
                <Footer />
              </>
            }
          />
          <Route
            path="/order-history"
            element={
              <>
                <Header />
                <OrderHistory />
                {isMember() && <Chatbox />}
                <Footer />
              </>
            }
          />
          <Route
            path="/order-detail/:id"
            element={
              <>
                <Header />
                <OrderDetails />
                {isMember() && <Chatbox />}
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <UserProfile />
                {isMember() && <Chatbox />}
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <>
                <Header />
                <ProductDetail />
                {isMember() && <Chatbox />}
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
                {isMember() && <Chatbox />}
                <Footer />
              </>
            }
          />
          <Route path="/payment" element={<Payment />} />
        </Routes>

        {/* Routes for staff */}
        <Routes>
          <Route
            path="/staff/dashboard"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <DashBoard />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/profile"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <StaffProfile />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/all-products"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <AllProduct />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/add-product"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <AddProduct />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/update-product/:id"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <UpdateProduct />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/management-user"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <ManagementUser />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/management-user/user-detail/:id"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <UserDetail />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/management-user/user-orders/:id"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <UserOrders />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/order-list"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />

                    <OrderList />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/order-list/order-detail/:id"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />
                    <OrderDetail />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/staff/management-product"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />
                    <ManagementProduct />
                  </div>
                </div>
              </>
            }
          />

          <Route
            path="/staff/management-order"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />
                    <ManagementOrder />
                  </div>
                </div>
              </>
            }
          />

          <Route
            path="/staff/management-chat"
            element={
              <>
                <div className="flex">
                  <SideBar />
                  <div className="flex-1">
                    <Headerv2 />
                    <ManageTakeCare />
                  </div>
                </div>
              </>
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <>
                <div className="flex">
                  <SideBarv2 />
                  <div className="flex-1">
                    <Headerv3 />

                    {/* <Dashboard /> */}
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <>
                <div className="flex">
                  <SideBarv2 />
                  <div className="flex-1">
                    <Headerv3 />

                    <StaffProfile />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/management-staff"
            element={
              <>
                <div className="flex">
                  <SideBarv2 />
                  <div className="flex-1">
                    <Headerv3 />
                    <ManagementStaff />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/staff-detail/:id"
            element={
              <>
                <div className="flex">
                  <SideBarv2 />
                  <div className="flex-1">
                    <Headerv3 />
                    <StaffDetail />
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
