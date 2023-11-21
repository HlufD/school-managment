import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updateRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { updateLvel } from "../../app/feauters/other/otherSlice";
import { close } from "../../app/feauters/modal/modalSlice";
import { Formik, Form, Field } from "formik";

const validationSchema = Yup.object().shape({
  level: Yup.string()
    .required("course name is rerequired")
    .min(1, "course name must at least 4 chars")
    .max(30, "course name must at most 30 chars"),
});
function EditLevel({ id }) {
  const { levels } = useSelector((store) => store.OthersStates);
  const dispatch = useDispatch();
  const currentLevel = levels.find((level) => level.id == id);
  return (
    <div className="add-course-form">
      <Formik
        initialValues={currentLevel}
        validationSchema={validationSchema}
        onSubmit={async (level) => {
          const data = await updateRequest(
            "http://localhost:5000/api/levels",
            id,
            level
          );
          if (data["errorType"]) {
            toast.error(data["message"]);
          }
          if (!data["errorType"]) {
            toast.success(data["message"]);
            const { level } = data;
            dispatch(updateLvel(level));
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

export default EditLevel;
