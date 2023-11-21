import { Formik, Form, Field } from "formik";
import React from "react";
import * as Yup from "yup";
import { postRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { close } from "../../app/feauters/modal/modalSlice";
import { useDispatch } from "react-redux";
import { addSchool_year } from "../../app/feauters/other/otherSlice";

const validationSchema = Yup.object().shape({
  year_name: Yup.string()
    .required("Year name is rerequired")
    .min(3, "School Year name must at least 4 chars")
    .max(30, "School Year name must at most 30 chars"),
  startring_date: Yup.string().required("Starting string is required"),
  end_date: Yup.date().required("End Date is required"),
});

function AddSchool_years() {
  const dispatch = useDispatch();
  return (
    <div className="add-course-form">
      <Formik
        initialValues={{ year_name: "", startring_date: "", end_date: 0 }}
        validationSchema={validationSchema}
        onSubmit={async (school_Year) => {
          const data = await postRequest(
            "http://localhost:5000/api/school_years",
            school_Year
          );
          if (data["errorType"]) {
            toast.error(data["message"]);
          }
          if (!data["errorType"]) {
            toast.success(data["message"]);
            dispatch(addSchool_year({ school_year: data.school_Year }));
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
                value={values.year_name}
                name="year_name"
                placeholder="School Year Name"
              />
              {errors.year_name && touched.year_name ? (
                <p className="error">{errors.year_name}</p>
              ) : null}
            </div>
            <div>
              <Field
                required
                type="date"
                onChange={handleChange}
                value={values.startring_date}
                name="startring_date"
                id=""
              />
              {errors.startring_date && touched.startring_date ? (
                <p className="error">{errors.startring_date}</p>
              ) : null}
            </div>
            <div>
              <Field
                required
                type="date"
                onChange={handleChange}
                value={values.end_date}
                name="end_date"
                id=""
              />
              {errors.end_date && touched.end_date ? (
                <p className="error">{errors.end_date}</p>
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

export default AddSchool_years;
