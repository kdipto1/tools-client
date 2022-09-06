import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import NotFound from "./Components/NotFound/NotFound";
import Footer from "./Components/Footer/Footer";
import Purchase from "./Components/Purchase/Purchase";
import Dashboard from "./Components/Dashboard/Dashboard";
import MyProfile from "./Components/Dashboard/MyProfile";
import MyOrders from "./Components/Dashboard/MyOrders";
import Payment from "./Components/Dashboard/Payment";
import AddReview from "./Components/Dashboard/AddReview";
import MakeAdmin from "./Components/Dashboard/MakeAdmin";
import AddProduct from "./Components/Dashboard/AddProduct";
import ManageOrder from "./Components/Dashboard/ManageOrder";
import ManageProducts from "./Components/Dashboard/ManageProducts";
import RequireAuth from "./Components/Login/RequireAuth";
import RequireAdmin from "./Components/Login/RequireAdmin";
import Contact from "./Components/Home/Contact";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="myOrders" element={<MyOrders />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="addReview" element={<AddReview />} />
          <Route
            path="makeAdmin"
            element={
              <RequireAdmin>
                <MakeAdmin />
              </RequireAdmin>
            }
          />
          <Route
            path="addProduct"
            element={
              <RequireAdmin>
                <AddProduct />
              </RequireAdmin>
            }
          />
          <Route
            path="manageOrders"
            element={
              <RequireAdmin>
                <ManageOrder />
              </RequireAdmin>
            }
          />
          <Route
            path="manageProducts"
            element={
              <RequireAdmin>
                <ManageProducts />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
