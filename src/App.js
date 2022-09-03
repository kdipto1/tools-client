import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import SocialLogin from "./Components/Login/SocialLogin";

function App() {
  return (
    <>
      {/* <Register></Register> */}
      <Routes>
        <Route path="" element={""} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
