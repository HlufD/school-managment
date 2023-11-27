import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  studentId: Yup.string().required("Student Id can not be empty "),
  courseId: Yup.string().required("Course Id can not be empty"),
});

export default validationSchema;
