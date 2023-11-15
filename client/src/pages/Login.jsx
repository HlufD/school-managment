import React from "react";
import("../styles/Login.scss");
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../app/feauters/user/userSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";
axios.defaults.withCredentials = true;

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .max(30, "username must be max 30 chars")
    .min(5, "username must be min 5 chars")
    .email("Invalid email"),
  password: yup
    .string()
    .max(30, "password must be max 30 chars")
    .min(5, "password must be min 5 chars"),
});

function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { setValue, getValue } = useLocalStorage("isLogedIn");

  return (
    <section>
      <div className="img-wraper">
        <img src="./img/selam.jpg" alt="" />
      </div>
      <p>welcome Admin </p>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (user) => {
          try {
            const res = await axios.post(
              "http://localhost:5000/api/login",
              user,
              {
                withCredentials: true,
              }
            );
            const data = await res.data;
            setValue(true);
            data.user.isLogedIn = getValue();
            dispatch(login(data.user));
            toast.success("login successful!");
            history("/dashboard");
          } catch (error) {
            console.log(error.response.data);
          }
        }}
      >
        {({ values, handleChange, touched, errors }) => (
          <Form>
            <div>
              <Field
                required
                type="email"
                onChange={handleChange}
                value={values.username}
                name="username"
                placeholder="username"
              />
              {errors.username && touched.username ? (
                <p className="error">{errors.username}</p>
              ) : null}
            </div>
            <div>
              <Field
                required
                type="password"
                placeholder="password"
                onChange={handleChange}
                value={values.password}
                name="password"
                id=""
              />
              {errors.password && touched.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Login;
