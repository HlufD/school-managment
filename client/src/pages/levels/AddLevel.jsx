import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { postRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { addLevels } from "../../app/feauters/other/otherSlice";
import { close } from "../../app/feauters/modal/modalSlice";
import { Formik, Form, Field } from "formik";

const validationSchema = Yup.object().shape({
  level: Yup.string()
    .required("course name is rerequired")
    .min(1, "course name must at least 4 chars")
    .max(30, "course name must at most 30 chars"),
});
function AddLevel() {
  const dispatch = useDispatch();

  return (
    <div className="add-course-form">
      <Formik
        initialValues={{ level: "" }}
        validationSchema={validationSchema}
        onSubmit={async (level) => {
          const data = await postRequest(
            "http://localhost:5000/api/levels",
            level
          );
          if (data["errorType"]) {
            toast.error(data["message"]);
          }
          if (!data["errorType"]) {
            toast.success(data["message"]);
            const { Level } = data;
            dispatch(addLevels(Level));
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
                value={values.level}
                name="level"
                placeholder="level"
              />
              {errors.level && touched.level ? (
                <p className="error">{errors.level}</p>
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

export default AddLevel;
