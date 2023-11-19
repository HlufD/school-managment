import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updateRequest } from "../../utils/apiHelperMethodes";
import { updateCourse } from "../../app/feauters/course/courseSlice";
import { toast } from "react-toastify";
import { close } from "../../app/feauters/modal/modalSlice";

const validationSchema = Yup.object().shape({
  course_name: Yup.string()
    .required("course name is rerequired")
    .min(3, "course name must at least 4 chars")
    .max(30, "course name must at most 30 chars"),
  course_code: Yup.string()
    .required()
    .min(3, "course code must at least 4 chars")
    .max(30, "course code must at most 30 chars"),
  credit_hour: Yup.number().required("credit_hour,is required"),
});

function EditCourse({ id }) {
  const { courses } = useSelector((store) => store.Course);
  const coursetoBeEdited = courses.find((course) => course.id == id);
  const dispatch = useDispatch();

  return (
    <div className="add-course-form">
      <Formik
        initialValues={coursetoBeEdited}
        validationSchema={validationSchema}
        onSubmit={async (course) => {
          const data = await updateRequest(
            "http://localhost:5000/api/courese",
            id,
            course
          );
          if (data["errorType"]) {
            toast.error(data["message"]);
          }
          console.log(data.course);
          dispatch(updateCourse({ course: data.course }));
          toast.success(data["message"]);
          dispatch(close());
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
                <p className="error">{errors.course_code}</p>
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

export default EditCourse;
