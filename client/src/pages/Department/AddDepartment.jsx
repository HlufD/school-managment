import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { close } from "../../app/feauters/modal/modalSlice";
import { addDepartment } from "../../app/feauters/department/departmentSlice";
import { toast } from "react-toastify";
import { postRequest } from "../../utils/apiHelperMethodes";

const validationSchema = Yup.object().shape({
  dep_name: Yup.string()
    .required("Department name is rerequired")
    .min(3, "Department name must at least 4 chars")
    .max(30, "Department name must at most 30 chars"),
  dep_code: Yup.string()
    .required("Department Code is rerequired")
    .min(3, "Department code must at least 4 chars")
    .max(30, "Department code must at most 30 chars"),
});

function AddDepartment() {
  const dispatch = useDispatch();
  return (
    <div className="add-course-form">
      <Formik
        initialValues={{ dep_code: "", dep_name: "" }}
        validationSchema={validationSchema}
        onSubmit={async (department) => {
          const data = await postRequest(
            "http://localhost:5000/api/departments",
            department
          );
          if (data["errorType"]) {
            toast.error(data["message"]);
          }
          if (!data["errorType"]) {
            toast.success(data["message"]);
            dispatch(addDepartment({ department: data.department }));
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
                value={values.dep_name}
                name="dep_name"
                placeholder="Department Name"
              />
              {errors.dep_name && touched.dep_name ? (
                <p className="error">{errors.dep_name}</p>
              ) : null}
            </div>
            <div>
              <Field
                required
                type="text"
                placeholder="Department Code"
                onChange={handleChange}
                value={values.dep_code}
                name="dep_code"
                id=""
              />
              {errors.dep_code && touched.dep_code ? (
                <p className="error">{errors.dep_code}</p>
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

export default AddDepartment;
