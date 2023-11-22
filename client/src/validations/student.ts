import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "First Name must have at least 3 characters")
    .max(30, "First Name must have at most 30 characters"),
  last_name: Yup.string()
    .min(3, "Last Name  must at least 3 characters")
    .max(30, "Last Name  must at most 30 characters"),
  age: Yup.number().required("age is required"),
  sex: Yup.string()
    .min(3, "sex must have at least 3 characters")
    .max(30, "sexName must have at most 30 characters"),
  phone_number: Yup.string().required("phone_number is required"),
  student_TypeId: Yup.number().required("student_TypeId is required"),
  departmentId: Yup.string().required("departmentId is required"),
  picture: Yup.string().required("picture is required"),
});

export default validationSchema;
