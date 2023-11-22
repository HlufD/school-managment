import { Formik, Form, Field } from "formik";
import { postRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../app/feauters/modal/modalSlice";
import { addCourse } from "../../app/feauters/course/courseSlice";
import studentValidation from "../../validations/student";

import("../../styles/students.scss");

function EditStudent({ id }) {
  const { students } = useSelector((store) => store.Student);
  const currentStudent = students.find((student) => student.id === id);
  console.log(currentStudent);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="wrapper-student">
        <Formik
          initialValues={currentStudent}
          validationSchema={studentValidation}
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
              <div className="add-student">
                <article>
                  <div>
                    <Field
                      required
                      type="text"
                      onChange={handleChange}
                      value={values.first_name}
                      name="first_name"
                      placeholder="First Name"
                    />
                    {errors.first_name && touched.first_name ? (
                      <p className="error">{errors.first_name}</p>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      required
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={values.last_name}
                      name="last_name"
                      id=""
                    />
                    {errors.last_name && touched.last_name ? (
                      <p className="error">{errors.last_name}</p>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      required
                      type="number"
                      placeholder="Age"
                      onChange={handleChange}
                      value={values.age}
                      name="age"
                      id=""
                    />
                    {errors.age && touched.age ? (
                      <p className="error">{errors.age}</p>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      required
                      type="text"
                      placeholder="sex"
                      onChange={handleChange}
                      value={values.sex}
                      name="sex"
                      id=""
                    />
                    {errors.sex && touched.sex ? (
                      <p className="error">{errors.sex}</p>
                    ) : null}
                  </div>
                </article>
                <article>
                  <div>
                    <Field
                      required
                      type="text"
                      onChange={handleChange}
                      value={values.phone_number}
                      name="phone_number"
                      placeholder="Phone Number"
                    />
                    {errors.phone_number && touched.phone_number ? (
                      <p className="error">{errors.phone_number}</p>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      required
                      type="text"
                      placeholder="Program"
                      onChange={handleChange}
                      value={values.student_TypeId}
                      name="student_TypeId"
                      id=""
                    />
                    {errors.student_TypeId && touched.student_TypeId ? (
                      <p className="error">{errors.student_TypeId}</p>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      required
                      type="text"
                      placeholder="Deraprtment"
                      onChange={handleChange}
                      value={values.departmentId}
                      name="departmentId"
                      id=""
                    />
                    {errors.departmentId && touched.departmentId ? (
                      <p className="error">{errors.departmentId}</p>
                    ) : null}
                  </div>
                  {/* <div>
                    <Field
                      required
                      type="file"
                      placeholder="Picture"
                      onChange={handleChange}
                      value={values.picture}
                      name="picture"
                      id=""
                    />
                    {errors.picture && touched.picture ? (
                      <p className="error">{errors.picture}</p>
                    ) : null}
                  </div> */}
                </article>
              </div>

              <button className="submit-button" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditStudent;
