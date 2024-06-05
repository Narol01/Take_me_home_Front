import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  deletePet,
  getPets,
  getPetsByFilter,
  selectPets,
} from "../../features/pets/petsSlice"
import { Link, useNavigate, useParams } from "react-router-dom"
import s from "./personalCabinet.module.css"
import { deleteUser, selectUser } from "../../features/auth/authSlice"
import Messages from "./messages/Messages"

export default function PersonalCabinet() {
  
  const { author } = useParams<{ author: string }>()
  const petsList = useAppSelector(selectPets)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPetsByFilter({ author }))
  }, [dispatch, author])

  const handleDeleteAccount = async () => {
    if (user) {
      const result = await dispatch(deleteUser(user.id))
      if (deleteUser.fulfilled.match(result)) {
        navigate("/") // Перенаправление на домашнюю страницу
      } else {
        console.error("Failed to delete user", result.error.message)
      }
    }
  }
  return (
    <div className={s.cabinet}>
      <div className={s.profile_container}>
        <h1>My account</h1>
        <div className={s.profile_header}>
          <h2>{user?.fullName}</h2>
          <div className={s.avatar_preview}>
            {user?.photoUrls && (
              <img
                src={`${"http://localhost:8080"}${user.photoUrls}`}
                alt="User Avatar"
              />
            )}
          </div>
        </div>
        <div className={s.contact}>
          <label htmlFor="email">Email:</label>
          <span>{user?.email}</span>
        </div>
        <div className={s.contact}>
          <label htmlFor="phone">Phone:</label>
          <span>{user?.phone}</span>
        </div>
        <div className={s.contact}>
          <label htmlFor="website">Website:</label>
          <a href={`https://${user?.website}`} target="_blank" rel="noopener noreferrer">{user?.website}</a>
        </div>

        <div className={s.profile_changes}>
          <Link to={`/editUser`} className={s.link}>{` Change personal details `}</Link>
          <Link to={`/newPassword`} className={s.link}>{` Change password `}</Link>
          <button onClick={handleDeleteAccount} className={s.link}>{` Delete account `}</button>
        </div>
      </div>

      <div className={s.avert_container}>
        <div>
          <Link className={s.link_create_pet} to="/createPet/">{`Hello, ${user?.fullName}! Create a new pet avert`}</Link>
        </div>
        <ul>
          {petsList.map(p => (
            <li key={p.id}>
              <div className={s.avert_card}>
                <div className={s.avert_img}>
                  <img src={p.photos[0]} alt="" />
                </div>
                <Link to={`/petCard/${p.id}`}>{p.caption}</Link>
                <Link to={`/editPet/${p.id}`}>{`  Edit  `}</Link>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(deletePet(p.id))
                  }}
                >
                 Delete 
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.avert_container}>
      <Messages/>
      </div>      
    </div>
  )
}
