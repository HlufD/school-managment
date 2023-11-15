import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "rsuite/dist/rsuite.min.css";
import RegisterStudet from "./components/RegisterStudet";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

function Root() {
  const { isLogedIn } = useSelector((store) => store.User);
  const [loggedIn, setLogedin] = useState(false);
  const { getValue } = useLocalStorage("isLogedIn");
  useEffect(() => {
    setLogedin(getValue());
  }, [isLogedIn]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {loggedIn && (
          <>
            <Route path="/dashboard" element={<Home />}>
              <Route path="RegisterStudent" element={<RegisterStudet />} />
            </Route>
          </>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Root;
