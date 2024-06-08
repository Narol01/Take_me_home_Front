import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  deletePet,
  getPet,
  getPetsByFilter,
  selectPet,
  selectPets,
} from "../../../features/pets/petsSlice"
import s from "./adverts.module.css"
import ModalDeleteAccount from "../../modals/modalDeleteAccount/ModalDeleteAccount"

export default function Adverts() {
  const { author } = useParams<{ author: string }>()
  const petsList = useAppSelector(selectPets)
  const pet = useAppSelector(selectPet)
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    dispatch(getPetsByFilter({ author }))
  }, [dispatch, author])

  useEffect(() => {
    if (pet) {
      dispatch(getPet(pet?.id))
    }
  }, [dispatch, pet?.id])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className={s.avert_container}>
      <div className={s.avert_cards_wrapper}>
        {petsList.map(p => (
          <div key={p.id} className={s.avert_card}>
            <span
              className={s.avert_deadline}
            >{`active until: ${p.deadline}`}</span>
            <div className={s.avert_details}>
            <Link className={s.avert_caption} to={`/pet-card/${p.id}`}>{p.caption}</Link>
             
              <div className={s.avert_buttons}>
              <Link to={`/edit-pet/${p.id}`}>Edit</Link>
                <button type="button" onClick={openModal}>
                  {`Delete`}
                </button>
              </div>
              <ModalDeleteAccount
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={() => {
                  dispatch(deletePet(p.id))
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
