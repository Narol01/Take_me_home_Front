import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useAppDispatch } from "../../app/hooks"
import { register } from "../../features/auth/authSlice"
import { Link, useNavigate } from "react-router-dom"
import s from "./register.module.css"
import * as Yup from "yup"
import open from "./../../media/icons/openEye.png"
import close from "./../../media/icons/closeEye.png"

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    fullName: "",
    login: "",
    website: "",
    phone: "",
    telegram: "",
    agreeToTerms: false,
    avatar: null as File | null,
  }

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().matches(/^[A-Za-z]+$/, "Name can only contain Latin letters").required("Required"),
    login: Yup.string().required("Required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be no more than 8 characters") 
      .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,8}$/, "Password must contain at least one uppercase letter and one number") 
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.string(),
    website: Yup.string(),
    telegram: Yup.string(),
    agreeToTerms: Yup.bool().oneOf([true], "You must agree to the terms"),
  })

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const files = event.currentTarget.files
    if (files && files.length > 0) {
      const file = files[0]

      setFieldValue("avatar", file)
      const avatarPreview = URL.createObjectURL(file)
      setAvatarPreview(avatarPreview)
    }
  }

  return (
    <div className={s.register}>
      <div className={s.outerBox_register}>
        <h1>Create your account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const { avatar, agreeToTerms, ...user } = values
            try {
              await dispatch(register({ user, file: avatar as File }))
              resetForm()
              navigate("/")
            } catch (error) {
              console.error("Error in registration: ", error)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className={s.register_form}>
              <div
                className={s.uploadGroup__register}
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <div className={s.uploadControls_register}>
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className={s.photo_register}
                    />
                  ) : (
                    <div className={s.avatar_placeholder}>
                      <span>+</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="fileInput"
                  name="avatar"
                  accept="image/*"
                  onChange={event => handleAvatarChange(event, setFieldValue)}
                  style={{ display: "none" }}
                />
                <ErrorMessage
                  name="avatar"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group_register}>
                <Field
                  type="text"
                  name="fullName"
                  className={s.form_control_register}
                  placeholder="Full Name*"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group_register}>
                <Field
                  type="text"
                  name="login"
                  className={s.form_control_register}
                  placeholder="Username*"
                />
                <ErrorMessage
                  name="login"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group_register}>

              <div className={s.password_wrapper_register}>
                {/* <label htmlFor="password" className={s.required_field}>
                  Password
                </label> */}

                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={s.form_control_register}
                  placeholder="Password*"
                />
                <button
                    type="button"
                    className={s.toggle_password_register}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? close : open}
                      alt="Toggle visibility"
                      className={s.icon_register}
                    />
                  </button>
                  </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group_register}>
                <Field
                  type="email"
                  name="email"
                  className={`${s.form_control_register} required`}
                  placeholder="Email*"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group_register}>
                <Field
                  type="text"
                  name="phone"
                  className={s.form_control_register}
                  placeholder="Phone"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group_register}>
                <Field
                  type="text"
                  name="website"
                  className={s.form_control_register}
                  placeholder="Website"
                />
                <ErrorMessage
                  name="website"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group_register}>
                <Field
                  type="text"
                  name="telegram"
                  className={s.form_control_register}
                  placeholder="Telegram"
                />
                <ErrorMessage
                  name="telegram"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.formGroup_checkboxGroup}>
                <Field type="checkbox" name="agreeToTerms" />
                <label htmlFor="agreeToTerms">
                  I agree to{" "}
                  <Link to="/privacy-policy" className={s.checkboxGroup_link}>
                    Privacy Policy
                  </Link>                  
                </label>
                <ErrorMessage
                  name="agreeToTerms"
                  component="div"
                  className={s.error}
                />
              </div>

              <button
                type="submit"
                className={s.formButton_register}
                disabled={isSubmitting}
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
        <div className={s.accountExist}>
          <p>
            Already have an account?{"  "}
            <span
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => navigate("/login-form")}
              className={s.accountExist_login}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
