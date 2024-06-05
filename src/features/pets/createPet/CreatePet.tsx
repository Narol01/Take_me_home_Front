import { ErrorMessage, Field, Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useNavigate } from "react-router-dom"
import { addPet } from "../petsSlice"
import {
  ageList,
  categoryList,
  countryList,
  petTypeList,
  sexList,
} from "../petsList/data"
import { selectUser } from "../../auth/authSlice"
import { useState } from "react"
import * as Yup from "yup"
import styles from "./createPet.module.css"

export default function CreatePet() {
  const userSelected = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [previewImages, setPreviewImages] = useState<string[]>(["", "", ""])

  const handlePetPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const files = event.currentTarget.files as FileList
    if (files && files.length > 0) {
      setFieldValue(`photos[${index}]`, files[0])
      const filePreview = URL.createObjectURL(files[0])
      setPreviewImages(prevState => {
        const newState = [...prevState]
        newState[index] = filePreview
        return newState
      })
      // Добавляем класс для скрытия текста "Photo"
      event.currentTarget.parentElement?.classList.add(styles.photo_uploaded)
    }
  }
  

  return (
    <div className={styles.container_createPet}>
      <div className={styles.outerBox}>
        <h1>Create advert</h1>
        <Formik
          initialValues={{
            caption: "",
            petType: "",
            category: "",
            gender: "",
            age: "",
            country: "",
            city: "",
            description: "",
            photos: [] as File[],
          }}
          validationSchema={Yup.object({
            caption: Yup.string().required("Caption is required"),
            petType: Yup.string().required("Pet Type is required"),
            category: Yup.string().required("Category is required"),
            gender: Yup.string().required("Gender is required"),
            age: Yup.string().required("Age is required"),
            country: Yup.string().required("Country is required"),
            city: Yup.string().required("City is required"),
            description: Yup.string().required("Description is required"),
            photos: Yup.mixed().required("At least one photo is required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const {
              caption,
              petType,
              category,
              gender,
              age,
              country,
              city,
              description,
              photos,
            } = values
            const petDTO = {
              caption,
              petType,
              category,
              gender,
              age,
              country,
              city,
              description,
            }
            const files = photos
            try {
              await dispatch(addPet({ petDTO, files }))
              alert("Pet details updated successfully")
              navigate(`/personalCabinet/${userSelected?.login}`)
              resetForm()
            } catch (error) {
              console.error("Error then registering a pet: ", error)
              alert("Error creating pet details- add photo")
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className={styles.formGroup}>
                <Field as="select" name="petType">
                  <option value="" label="Select pet type" />
                  {petTypeList.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="petType"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <Field as="select" name="category">
                  <option value="" label="Select category" />
                  {categoryList.map((category, index) => (
                    <option key={index} value={category.value}>
                      {category.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <Field as="select" name="gender">
                  <option value="" label="Select gender" />
                  {sexList.map((gender, index) => (
                    <option key={index} value={gender.value}>
                      {gender.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <Field as="select" name="age">
                  <option value="" label="Select age" />
                  {ageList.map((age, index) => (
                    <option key={index} value={age.value}>
                      {age.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="age"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <Field as="select" name="country">
                  <option value="" label="Select country" />
                  {countryList.map((country, index) => (
                    <option key={index} value={country.value}>
                      {country.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <Field
                  name="city"
                  type="text"
                  placeholder="Indicate city/town"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <Field
                  name="caption"
                  type="text"
                  placeholder="Title (maximum 100 characters)"
                  maxLength={100}
                />
                <ErrorMessage
                  name="caption"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Describe the animal's history, features, character"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.uploadGroup}>
                <label>Maximum 3 photos can be uploaded</label>
                <div className={styles.uploadControls}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className={styles.photo_upload}>
                      <div className={styles.photo_preview}>
                        {previewImages[index] && (
                          <img
                            src={previewImages[index]}
                            alt={`Preview ${index}`}
                          />
                        )}
                      </div>

                      <input
                        type="file"
                        name={`photos[${index}]`}
                        onChange={event =>
                          handlePetPhotoChange(event, index, setFieldValue)
                        }
                      />
                      <ErrorMessage
                        name={`photos[${index}]`}
                        component="div"
                        className={styles.error}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={styles.formButton_createPet}
                type="submit"
                disabled={isSubmitting}
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
