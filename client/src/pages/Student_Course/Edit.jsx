import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { updateRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../app/feauters/modal/modalSlice";
import validationSchema from "../../validations/studentCourse";
import { editStudentCourse } from "../../app/feauters/student_course/studentCourseSlice";

function Edit({ id }) {
  const dispatch = useDispatch();
  const { student_courses } = useSelector((store) => store.studentCourse);
  const currentCourse = student_courses.find((course) => course.id == id);
  const { courses } = useSelector((store) => store.Course);

  const [course, setCourse] = useState(currentCourse);
  const handleChange = (e) => {
    setCourse((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { studentId, courseId } = course;
    const data = await updateRequest(
      "http://localhost:5000/api/studet_courses",
      id,
      { studentId, courseId }
    );
    if (data["errorType"]) {
      toast.error(data["message"]);
    }
    console.log(data);
    if (!data["errorType"]) {
      dispatch(editStudentCourse(data.student));
      dispatch(close());
      toast.success(data["message"]);
    }
  };
  console.log(course);
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

export default Edit;
