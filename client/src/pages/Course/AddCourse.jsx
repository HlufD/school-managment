import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { postRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { close } from "../../app/feauters/modal/modalSlice";
import { addCourse } from "../../app/feauters/course/courseSlice";

function AddCourse() {
  const dispatch = useDispatch();
  return (
    <div className="add-course-form">
      <Formik
        initialValues={{ course_code: "", course_name: "", credit_hour: 0 }}
        validationSchema={validationSchema}
        onSubmit={async (course) => {
          const data = await postRequest(
            "http://localhost:5000/api/courese",
            course
          );
          if (data["errorType"]) {
            toast.error(data["message"]);
          }
          if (!data["errorType"]) {
            toast.success(data["message"]);
            dispatch(addCourse({ course: data.course }));
            dispatch(close());
          }
        }}
      >
        {({ values, handleChange, touched, errors }) => (
          <Form>
            <div>
              <Field
                required
                type="text"
                onChange={handleChange}
                value={values.course_name}
                name="course_name"
                placeholder="Course Name"
              />
              {errors.course_name && touched.course_name ? (
                <p className="error">{errors.course_name}</p>
              ) : null}
            </div>
            <div>
              <Field
                required
                type="text"
                placeholder="Course Code"
                onChange={handleChange}
                value={values.course_code}
                name="course_code"
                id=""
              />
              {errors.course_code && touched.course_code ? (
                <p className="error">{errors.course_code}</p>
              ) : null}
            </div>
            <div>
              <Field
                required
                type="number"
                placeholder="Credit Hour"
                onChange={handleChange}
                value={values.credit_hour}
                name="credit_hour"
                id=""
              />
              {errors.course_code && touched.course_code ? (
                <p className="error">{errors.credit_hour}</p>
              ) : null}
            </div>
            <div>
              <button className="button" type="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddCourse;
