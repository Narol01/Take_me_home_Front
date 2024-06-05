import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  updateUser,
  selectUser,
  selectIsAuthenticated,
} from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { UserUpdateDto } from "../../features/auth/types"

const EditUser: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
    if (user && user.photoUrls) {
      setAvatarPreview(user.photoUrls); // Set current avatar as initial preview
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
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    website: Yup.string(),
    phone: Yup.string(),
    telegram: Yup.string(),
  });

  const handleSubmit = async (
    values: UserUpdateDto,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
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
        navigate(`/personalCabinet/${user?.login}`);
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
      const formData = new FormData();
      formData.append("image", file);
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in to edit your profile.</p>;
  }

return (
    <div>
      <h2>Edit User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <Field type="text" name="fullName" />
              <ErrorMessage name="fullName" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="website">Website:</label>
              <Field type="text" name="website" />
              <ErrorMessage name="website" component="div" />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
            <div>
              <label htmlFor="telegram">Telegram:</label>
              <Field type="text" name="telegram" />
              <ErrorMessage name="telegram" component="div" />
            </div>
            <div>
              
              <input
                id="file"
                name="file"
                type="file"
                onChange={event => {
                  handleFileChange(event);
                  setFieldValue("file", event.currentTarget.files?.[0]);
                }}
              />
            </div>
            {avatarPreview && (
              <div>
                <img
                  src={avatarPreview as string}
                  alt="Avatar Preview"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUser;