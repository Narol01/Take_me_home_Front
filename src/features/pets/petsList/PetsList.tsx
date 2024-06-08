import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getPetsByFilter, selectPets } from "../petsSlice"
import { Link } from "react-router-dom"
import { StringParam, useQueryParams } from "use-query-params"
import s from "./petsList.module.css"
import Dropdown from "../../../components/dropdown/Dropdown"
import { sexList, countryList, categoryList, ageList } from "./data"

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
    <div className={s.container_petsList}>
      <div className={s.dropdown_container}>
        <div className={s.dropdown_menu}>
          <div className={s.dropdown_label}>
            <Dropdown 
              label="Country:" 
              options={[...countryList]}
              value={queryParams.country || ""}
              onChange={event => handleDropdownChange(event, "country")}
            />
          </div>
          <div className={s.dropdown_label}>
            <Dropdown
              label="Category:"
              options={[...categoryList]}
              value={queryParams.category || ""}
              onChange={event => handleDropdownChange(event, "category")}
            />
          </div>
          <div className={s.dropdown_label}>
            <Dropdown
              label="Age:"
              options={[...ageList]}
              value={queryParams.age || ""}
              onChange={event => handleDropdownChange(event, "age")}
            />
          </div>
          <div className={s.dropdown_label}>
            <Dropdown
              label="Sex:"
              options={[...sexList]}
              value={queryParams.gender || ""}
              onChange={event => handleDropdownChange(event, "gender")}
            />
          </div>
          <button
            className={s.reset_filter}
            type="button"
            onClick={handleResetFilter}
          >
            Reset filter
          </button>
        </div>
      </div>

      <div className={s.petList_box}>
      <ul className={s.petList}>
        {petsByType.map(p => (
          <li key={p.id} className={s.petItem}>
            <div className={s.petCard}>
            <div className={s.petCard_img}>
               {p.photoUrls && p.photoUrls[0] ? ( 
                  <img src={`${"https://take-me-home-sqbog.ondigitalocean.app"}${p.photoUrls[0]}`} 
                       alt={`Photo of ${p.caption}`} 
                   /> ) : ( 
                   <div className={s.noPhoto}>No Photo
                   </div> )} 
            </div>
              <div className={s.petCard_body}>
                <div className={s.petCard_body_location}>
                  <p>{p.country}</p>
                  <p>{p.city}</p>
                </div>
                <div className={s.petCard_body_caption}>
                  <h1>{p.caption}</h1>
                </div>                
                <p>category: {p.category}</p>
                <p>age: {p.age}</p>
                <p>sex: {p.gender}</p>
                <div className={s.petCard_btn}>
                  <Link to={`/pet-card/${p.id}`}>Read more</Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}
