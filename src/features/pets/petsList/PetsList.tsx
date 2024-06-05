import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { deletePet, getPetsByFilter, selectPets } from "../petsSlice"
import { Link } from "react-router-dom"
import { BooleanParam, StringParam, useQueryParams } from "use-query-params"
import s from "./petsList.module.css"
import Dropdown from "../../../components/dropdown/Dropdown"
import { sexList, countryList, categoryList, ageList } from "./data"
//import Checkbox from "../../../components/dropdown/Checkbox"

export default function PetsList() {
  const petsByType = useAppSelector(selectPets)
  const dispatch = useAppDispatch()

  const [queryParams, setQueryParams] = useQueryParams({
    petType: StringParam,
    country: StringParam,
    category: StringParam,
    age: StringParam,
    gender: StringParam,
  })

  useEffect(() => {
    dispatch(getPetsByFilter(queryParams))
  }, [dispatch, queryParams])

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    param: string,
  ) => {
    // Получаем значение выбранного элемента из события
    const value = event.target.value
    setQueryParams({ ...queryParams, [param]: value })
  }
  const handleResetFilter = () => {
    setQueryParams({
      country: "",
      category: "",
      age: "",
      gender: "",
    })
  }
  return (
    <>
      <div className={s.dropdown_container}>
        <div className={s.dropdown_menu}>
          <Dropdown
            label="Country"
            options={[...countryList]}
            value={queryParams.country || ""}
            onChange={event => handleDropdownChange(event, "country")}
          />
          <Dropdown
            label="Category"
            options={[...categoryList]}
            value={queryParams.category || ""}
            onChange={event => handleDropdownChange(event, "category")}
          />
          <Dropdown
            label="Age"
            options={[...ageList]}
            value={queryParams.age || ""}
            onChange={event => handleDropdownChange(event, "age")}
          />
          <Dropdown
            label="Sex"
            options={[...sexList]}
            value={queryParams.gender || ""}
            onChange={event => handleDropdownChange(event, "gender")}
          />
          <button
            className={s.reset_filter}
            type="button"
            onClick={handleResetFilter}
          >
            Reset filter
          </button>
        </div>
      </div>
      <ul>
        {petsByType.map(p => (
          <li key={p.id}>
            <div className={s.petCard}>
              <div className={s.petCard_img}>
                <img src={p.photos[0]} alt="" />
                <div className={s.petCard_btn}>
                  <Link to={`/petCard/${p.id}`}>Read more</Link>
                </div>
              </div>
              <div className={s.petCard_body}>
                <p>{p.dateCreate}</p>
                <h3>{p.country}</h3>
                <p>{p.city}</p>
                <h1>{p.caption}</h1>
                <p>{p.category}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
