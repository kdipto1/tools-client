import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import SocialLogin from "./Components/Login/SocialLogin";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
