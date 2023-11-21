import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updateRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import {
  addLevels,
  addTypes,
  updateTypes,
} from "../../app/feauters/other/otherSlice";
import { close } from "../../app/feauters/modal/modalSlice";
import { Formik, Form, Field } from "formik";

const validationSchema = Yup.object().shape({
  type_name: Yup.string()
    .required("Program name is rerequired")
    .min(1, "Program name must at least 4 chars")
    .max(30, "Program name must be at most 30 chars"),
  type_code: Yup.string()
    .required("program code is required")
    .min(1, "Program code must at least 4 chars")
    .max(30, "Program code must be at most 30 chars"),
});
function EdiTypes({ id }) {
  const dispatch = useDispatch();
  const { types } = useSelector((store) => store.OthersStates);
  const currentProgram = types.find((program) => program.id == id);
  return (
    <div className="add-course-form">
      <Formik
        initialValues={currentProgram}
        validationSchema={validationSchema}
        onSubmit={async (input_program) => {
          const data = await updateRequest(
            "http://localhost:5000/api/student_type",
            id,
            input_program
          );
          if (data["errorType"]) {
            toast.error(data["message"]);
          }
          if (!data["errorType"]) {
            toast.success(data["message"]);
            const { program } = data;
            dispatch(updateTypes(program));
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
                value={values.type_name}
                name="type_name"
                placeholder="Program Name"
              />
              {errors.type_name && touched.type_name ? (
                <p className="error">{errors.type_name}</p>
              ) : null}
            </div>
            <div>
              <Field
                required
                type="text"
                onChange={handleChange}
                value={values.type_code}
                name="type_code"
                placeholder="Program Code"
              />
              {errors.type_code && touched.type_code ? (
                <p className="error">{errors.type_code}</p>
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

export default EdiTypes;
