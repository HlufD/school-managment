import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "rsuite/dist/rsuite.min.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ListCourse from "./pages/Course/ListCourse";
import ListDepartments from "./pages/Department/ListDepartments";
import AddStudent from "./pages/Student/AddStudent";
import ListStudents from "./pages/Student/ListStudents";
import EditStudent from "./pages/Student/EditStudent";
import School_Years from "./pages/Years/School_Years";
import Levels from "../src/pages/levels/Levels";
import Student_Types from "./pages/Types/Student_Types";
import Student_Course from "./pages/Student_Course/Student_Course";
import Viwe from "./pages/Student/viwe";

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
              <Route path="list_courses" element={<ListCourse />} />
              <Route path="list_departments" element={<ListDepartments />} />
              <Route path="levels" element={<Levels />} />
              <Route path="student-types" element={<Student_Types />} />
              <Route path="school-years" element={<School_Years />} />
              <Route path="list_students" element={<ListStudents />} />
              <Route path="student_course" element={<Student_Course />} />
              <Route path="viwe_student/:id" element={<Viwe />} />
            </Route>
          </>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Root;
