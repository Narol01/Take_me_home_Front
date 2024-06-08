import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { deleteUser, selectUser } from "../../../features/auth/authSlice"
import s from "./profile.module.css"
import { getPetsByFilter } from "../../../features/pets/petsSlice"
import ModalDeleteAccount from "../../modals/modalDeleteAccount/ModalDeleteAccount"

export default function Profile() {

  const user = useAppSelector(selectUser)
  const { author } = useParams<{ author: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getPetsByFilter({ author }))
  }, [dispatch, author])

  const handleDeleteAccount = async () => {
    if (user) {
      const result = await dispatch(deleteUser(user.id))
      if (deleteUser.fulfilled.match(result)) {
        navigate("/") 
      } else {
        console.error("Failed to delete user", result.error.message)
      }
    }
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const confirmDelete = () => {
    closeModal()
    handleDeleteAccount()
  }

  return (
    <div className={s.profile_container}>
      <h1>My profile</h1>
      <div className={s.profile_header}>
        <h2>{user?.fullName}</h2>
        <div className={s.avatar_preview}>
          {user?.photoUrls && (
            <img
              src={`${"https://take-me-home-sqbog.ondigitalocean.app"}${user.photoUrls}`}
              // "http://localhost:8080"
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
        <a
          className={s.a_contact}
          href={`https://${user?.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {user?.website}
        </a>
      </div>

      <div className={s.profile_changes}>
        <Link to={`/edit-user`} className={s.link}>
          Change personal details
        </Link>
        <Link to={`/new-password`} className={s.link}>
          Change password
        </Link>
        <button
          onClick={openModal}
          className={s.link_button}
        >{` Delete account `}</button>
      </div>
      <ModalDeleteAccount
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
