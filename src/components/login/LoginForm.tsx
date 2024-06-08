import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, selectLoginError } from "../../features/auth/authSlice";
import { UserLoginDto } from "../../features/auth/types";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./login.module.css";
import { useState } from "react";
import open from "./../../media/icons/openEye.png"
import close from "./../../media/icons/closeEye.png"


export default function LoginForm() {

  const dispatch = useAppDispatch();
  const message = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: UserLoginDto = {
    login: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string()
              .required("Please enter your login"),
    password: Yup.string()                
                 .required("Please enter your password"),
  });

  const handleLogin = async (values: UserLoginDto) => {
    try {
      const dispatchResult = await dispatch(login(values));
      if (login.fulfilled.match(dispatchResult)) {
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          navigate(redirectPath);
          localStorage.removeItem("redirectAfterLogin");         
        } 
        else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Authorization error:", error);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.box_front}>
        <h2 className={styles.header}>Sign In Form</h2>
        <p className={styles.subtitle}>
          Sign in here using your username and password
          {message && <p>{`Please try again`}</p>}
        </p>
                 
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.input_group}>
                <Field
                  type="text"
                  name="login"
                  placeholder="Username"
                  className={styles.input_login}
                />
                <ErrorMessage
                  name="login"
                  component="div"
                  className={styles.error_message}
                />
              </div>
              <div className={styles.input_group}>
                <div className={styles.password_wrapper}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={styles.input_pass}
                  />
                  <button
                    type="button"
                    className={styles.toggle_password}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? close : open}
                      alt="Toggle visibility"
                      className={styles.icon}
                    />
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error_message}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.button}
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>
        <Link className={styles.link_account} to="/register">Create an account</Link>
      </div>
    </div>
  );
}
