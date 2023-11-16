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
import AddCourse from "./pages/Course/AddCourse";
import ViweCourse from "./pages/Course/ViweCourse";
import ListCourse from "./pages/Course/ListCourse";
import EditCourse from "./pages/Course/EditCourse";
import AddDepartment from "./pages/Department/AddDepartment";
import ViweDepartment from "./pages/Department/ViweDepartment";
import ListDepartments from "./pages/Department/ListDepartments";
import EditDepartment from "./pages/Department/EditDepartment";
import AddStudent from "./pages/Student/AddStudent";
import ViweStudent from "./pages/Student/ViweStudent";
import ListStudents from "./pages/Student/ListStudents";
import EditStudent from "./pages/Student/EditStudent";
import("./styles/Course.scss");

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
              <Route path="add_course" element={<AddCourse />} />
              <Route path="viwe_course" element={<ViweCourse />} />
              <Route path="list_courses" element={<ListCourse />} />
              <Route path="edit_course" element={<EditCourse />} />

              <Route path="add_department" element={<AddDepartment />} />
              <Route path="viwe_department" element={<ViweDepartment />} />
              <Route path="list_departments" element={<ListDepartments />} />
              <Route path="edit_department" element={<EditDepartment />} />

              <Route path="add_student" element={<AddStudent />} />
              <Route path="viwe_student" element={<ViweStudent />} />
              <Route path="list_students" element={<ListStudents />} />
              <Route path="edit_student" element={<EditStudent />} />
            </Route>
          </>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Root;
