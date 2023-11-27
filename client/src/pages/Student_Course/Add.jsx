import React, { useState } from "react";
import { postRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../app/feauters/modal/modalSlice";
import validationSchema from "../../validations/studentCourse";
import { addCourse } from "../../app/feauters/student_course/studentCourseSlice";

const ininitialValues = { studentId: "", courseId: "" };

function Add() {
  const dispatch = useDispatch();
  const { courses } = useSelector((store) => store.Course);
  const [course, setCourse] = useState(ininitialValues);
  const handleChange = (e) => {
    setCourse((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await postRequest(
      "http://localhost:5000/api/studet_courses",
      course
    );
    if (data["errorType"]) {
      toast.error(data["message"]);
    }

    if (!data["errorType"]) {
      toast.success(data["message"]);
      dispatch(addCourse(data.student_course));
      dispatch(close());
    }
  };

  return (
    <div className="add-course-form">
      <form onSubmit={onSubmit}>
        <div>
          <input
            required
            type="text"
            onChange={handleChange}
            value={course.studentId}
            name="studentId"
            placeholder="Student Id"
          />
          <select
            name="courseId"
            onChange={handleChange}
            value={course.courseId}
          >
            {courses.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.course_name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
