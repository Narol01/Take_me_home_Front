import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectUser } from "../../features/auth/authSlice"
import { fetchCurrentUser } from "../../features/auth/api"
import { ErrorMessage, Form, Formik } from "formik"

export default function Avatar() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [initialValues, setInitialValues] = useState({
    avatar: "",
  })

//   useEffect(() => {
//     if (!currentUser) {
//       dispatch(fetchCurrentUser())
//     } else {
//       setInitialValues({
//         avatar: currentUser.avatar,
//       })
//     }
//   }, [dispatch, currentUser])

//   const handleAvatarChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     setFieldValue: (
//       field: string,
//       value: any,
//       shouldValidate?: boolean,
//     ) => void,
//   ) => {
//     const file = event.currentTarget.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const base64String = reader.result as string
//         setAvatarPreview(base64String)
//         setAvatarFile(file)
//       }
//       reader.readAsDataURL(file)
//     }
//   }
  return (
    <div className="">
      {/* <div className="">
        <h2>Create your account</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await dispatch(register(values))
              resetForm() // очищаем форму
            } catch (error) {
              console.error("Ошибка при регистрации: ", error)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={s.register_form}>
              <div className={s.avatar_upload}>
                <div className={s.avatar_preview}>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" />
                  ) : (
                    <div className={s.avatar_placeholder}>
                      <span>+</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={event => handleAvatarChange(event, setFieldValue)}
                />
                <ErrorMessage name="avatar" component="div" className="error" />
              </div>

              <button type="submit" className="" disabled={isSubmitting}>
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div> */}
    </div>
  )
}
