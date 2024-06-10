import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUser, selectUser, selectIsAuthenticated } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { UserUpdateDto } from "../../features/auth/types";
import styles from "./editUser.module.css";

const EditUser: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login-form"); 
    }
    if (user && user.photoUrls) {
      setAvatarPreview(user.photoUrls); 
    }
  }, [isAuthenticated, navigate, user]);

  const initialValues: UserUpdateDto = {
    fullName: user?.fullName || "",
    telegram: user?.telegram || "",
    email: user?.email || "",
    website: user?.website || "",
    phone: user?.phone || ""
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
                 .matches(/^(?![\\s])[A-Za-z\\s]+$/, "Name can only contain Latin letters or a space at the beginning of the line")
                 .required("Full Name is required"),
    email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
    website: Yup.string(),
    phone: Yup.string(),
    telegram: Yup.string(),
  });

  const handleSubmit = async ( values: UserUpdateDto, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: any }
  ) => {
    if (user && user.id) {
      const userId = user.id;
      const selectedFile = (document.getElementById("file") as HTMLInputElement).files?.[0];

      try {
        if (selectedFile) {
          await dispatch(
            updateUser({ id: userId, userUpdateDto: values, file: selectedFile })
          ).unwrap();
        } else {
          await dispatch(
            updateUser({ id: userId, userUpdateDto: values, file: undefined })
          ).unwrap();
        }
        resetForm()
        navigate(`/personal-cabinet/${user?.login}`);
      } catch (error) {
        console.error("Failed to update user:", error);
      } finally {
        setSubmitting(false);
      }
    } else {
      console.error("User ID is undefined");
      setSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in to edit your profile.</p>;
  }

  function setFieldError(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={styles.container_edituser}>
      <div className={styles.outerBox_editUser}>
        <h1>Edit User</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name:</label>
                <Field type="text" name="fullName"
                       onChange={(e: { target: { value: any; }; }) => {
                        setFieldValue("fullName", e.target.value);
                        setFieldError("fullName", "");
                      }} />
                <ErrorMessage name="fullName" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email:</label>
                <Field type="email" name="email"
                        onChange={(e: { target: { value: any; }; }) => {
                          setFieldValue("email", e.target.value);
                          setFieldError("email", "");
                        }} />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="website">Website:</label>
                <Field type="text" name="website" />
                <ErrorMessage name="website" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone:</label>
                <Field type="text" name="phone" />
                <ErrorMessage name="phone" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telegram">Telegram:</label>
                <Field type="text" name="telegram" />
                <ErrorMessage name="telegram" component="div" className={styles.error} />
              </div>
              <div className={styles.uploadGroup}>
                <label>Upload Avatar</label>
                <div className={styles.uploadControls}>
                  <img
                    src={avatarPreview as string}
                    alt="Avatar Preview"
                    className={styles.photo}
                  />
                  <label className={styles.button_edit_photo}>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={event => {
                        handleFileChange(event);
                        setFieldValue("file", event.currentTarget.files?.[0]);
                      }}
                    />
                    <div className={styles.content}>+</div>
                  </label>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className={styles.formButton_editUser}>
                {isSubmitting ? "Updating..." : "Update Profile"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUser;
function resetForm() {
  throw new Error("Function not implemented.");
}