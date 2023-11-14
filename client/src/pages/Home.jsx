import React, { useEffect } from "react";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { login } from "../app/feauters/user/userSlice";
import { useDispatch } from "react-redux";

function Home() {
  const sendRefreshTokenRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/refresh_token", {
      withCredentials: true,
    });
    const data = res.data;
    return data;
  };
  const dispatch = useDispatch();
  useEffect(() => {
    let interval = setInterval(() => {
      sendRefreshTokenRequest()
        .then((data) => {
          dispatch(login(data));
        })
        .catch((err) => toast.error(err));
    }, 1000 * 5 * 60);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <SideNav />
      <Outlet />
    </div>
  );
}

export default Home;
