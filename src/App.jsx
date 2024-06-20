import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import PrivateOutlet from "./Routes/Private/PrivateOutlet";
// pages
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import SignUp from "./Pages/SignUp";
import Service from "./Pages/Service";
import About from "./Pages/About";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<PrivateOutlet />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
