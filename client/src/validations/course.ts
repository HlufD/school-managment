import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  course_code: Yup.string().required("Course Code can not be empty "),
  course_name: Yup.string().required("Course Name can not be empty"),
});

export default validationSchema;
