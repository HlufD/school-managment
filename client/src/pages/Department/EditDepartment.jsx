import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { close } from "../../app/feauters/modal/modalSlice";
import { updateRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { updateDepartment } from "../../app/feauters/department/departmentSlice";

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

function EditDepartment({ id }) {
  const { departments } = useSelector((store) => store.Department);
  const departementToBeEdideted = departments.find(
    (department) => department.id === id
  );
  const dispatch = useDispatch();

  return (
    <div className="add-course-form">
      <Formik
        initialValues={departementToBeEdideted}
        validationSchema={validationSchema}
        onSubmit={async (department) => {
          const data = await updateRequest(
            "http://localhost:5000/api/departments/",
            id,
            department
          );

          if (data["errorType"]) {
            toast.error(data["message"]);
          }
          console.log(data.department);
          dispatch(updateDepartment({ department: data.department }));
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
                onChange={handleChange}
                value={values.dep_code}
                name="dep_code"
                placeholder="Department Code"
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

export default EditDepartment;
