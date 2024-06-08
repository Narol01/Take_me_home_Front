import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { changePassword, selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from "./newPassword.module.css";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required"),
  newPassword: Yup.string()
    .max(8, "Password must be no more than 8 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,8}$/, "Password must contain at least one uppercase letter and one number")
    .required("Password is required"),
});

export default function NewPassword() {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();

  const handleSubmit = async (values: { oldPassword: string; newPassword: string }) => {
    try {
      await dispatch(changePassword(values));
      alert('Password changed successfully');
      navigate(`/personal-cabinet/${currentUser?.login}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error changing password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box_front}>
        <h2>Change Password</h2>
        <h1>{currentUser?.login}</h1>
        <Formik
          initialValues={{ oldPassword: '', newPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.formGroup}>
                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  className={styles.input}
                />
                <ErrorMessage name="oldPassword" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroup}>
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className={styles.input}
                />
                <ErrorMessage name="newPassword" component="div" className={styles.error} />
              </div>
              <button type="submit" disabled={isSubmitting} className={styles.button}>
                Change
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}