import React, { useEffect } from "react";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { login } from "../app/feauters/user/userSlice";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { fetchRequest } from "../utils/apiHelperMethodes";
import { setStudent } from "../app/feauters/student/studentSlice";
import { setTypes } from "../app/feauters/other/otherSlice";
import { setDepartment } from "../app/feauters/department/departmentSlice";
import { setCourse } from "../app/feauters/course/courseSlice";
import("../styles/Home.scss");

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
    }, 1000 * 28);
    return () => clearInterval(interval);
  }, []);

  // fetching corses
  const fetchStudents = async () => {
    const data = await fetchRequest("http://localhost:5000/api/students");
    const { students } = data;
    dispatch(setStudent(students));
  };

  // fetching Programs
  const fetchPrograms = async () => {
    const data = await fetchRequest("http://localhost:5000/api/student_type");
    const { student_Types } = data;
    dispatch(setTypes(student_Types));
  };
  //
  const fetchDepartment = async () => {
    const data = await fetchRequest("http://localhost:5000/api/departments");
    dispatch(setDepartment({ departments: data.departments }));
  };
  // fetching coures
  const fetchCourse = async () => {
    const data = await fetchRequest("http://localhost:5000/api/courese");
    dispatch(setCourse({ courses: data.courses }));
  };

  useEffect(() => {
    fetchStudents();
    fetchPrograms();
    fetchDepartment();
    fetchCourse();
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <SideNav />
      <div className="header-content-wrapper">
        <Header />
        <div className="dynamic-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
