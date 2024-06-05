import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  login,
  selectLoginError,
} from "../../features/auth/authSlice"
import { UserLoginDto } from "../../features/auth/types"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styles from "./login.module.css"
import { useState } from "react"


export default function  LoginForm() {

  const dispatch = useAppDispatch();
  const message = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const initialValues: UserLoginDto = {
    login: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    login: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  })

  
  const handleLogin = async (values: UserLoginDto) => {
    try {
      const dispatchResult = await dispatch(login(values))
      if (login.fulfilled.match(dispatchResult)) {
        // сказать Тане
        const redirectPath = localStorage.getItem("redirectAfterLogin")
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin")
          navigate(redirectPath)
        } else {
        navigate("/")
        }
      }
    } catch (error) {
      console.error("Authorization error:", error)
    }
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.box_front}>
        <h2 className={styles.header}>Sign In Form</h2>
        <p className={styles.subtitle}>
          Sign in here using your username and password
        </p>
        {message && <span>{message}</span>}
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
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={styles.input_pass}
                />
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
        {/* <a href="#" className={styles.link}>Forgot password</a> */}
        <Link className={styles.link_account} to="/register">Create an account</Link>
      </div>
    </div>
  )
}