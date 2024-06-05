import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useEffect, useState } from "react"
import style from "./PetCard.module.css"
import { getPet, selectPet } from "../petsSlice"
import PageNotFound from "../../../components/pageNotFound"
import { author, selectUser } from "../../auth/authSlice"
import {  UserUpdateDto } from "../../auth/types"
import Modal from "../../../components/modalProps/ModalProps"


export default function PetCard() {

  const currentUser = useAppSelector(selectUser)
  const { petId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const pet = useAppSelector(selectPet)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)

  useEffect(() => {
    if (petId) {
      dispatch(getPet(Number(petId)))
    }
  }, [dispatch, petId])
  
  const handleUser = async () => {
    if (currentUser && pet && pet.author) {
      try {
        const response = await dispatch(author(pet.author))
        const userData = response.payload as UserUpdateDto
        
        const handleSendEmail = () => {

          const subject = encodeURIComponent(
            "Interest in your pet ad",
          )
          const body = encodeURIComponent(
            `Hello,\n\n I am interested in your announcement: ${pet.caption}.`,
          )
          window.location.href = `mailto:${userData.email}?subject=${subject}&body=${body}`
        }

        if (userData && "fullName" in userData) {
          setModalContent(
            <div>
              <p>Name: {userData.fullName}</p>
              <button onClick={handleSendEmail}>Email: {userData.email}</button>
              <p>Phone: {userData.phone}</p>
              <p>Telegram: {userData.telegram}</p>
              <p>Website: {userData.website}</p>
            </div>,
          )
          setIsModalOpen(true)
        }
      } catch (error) {
        console.error("Error in retrieving author data: ", error)
      }
    } else {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);//сказать Тане
      navigate("/loginForm");
    }
  }

  if (!pet) {
    return <PageNotFound />
  }

  return (
    <div className={style.box}>
      <h2>{pet.caption}</h2>
      <div>
        {pet.photoUrls &&
          pet.photoUrls.map((url, index) => (
            <img
              key={index}
              src={`${"https://take-me-home-sqbog.ondigitalocean.app"}${url}`} 
              alt={`Pet ${index}`}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                margin: "10px",
              }}
            />
          ))}
      </div>
      <p>{pet.description}</p>
      <p>{pet.dateCreate}</p>
      <p>{pet.author}</p>
      <button onClick={() => navigate(-1)}>To previous page</button>
      <button onClick={handleUser}>Contacts</button>
    
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Contact details:"
      >
        {modalContent}
      </Modal>
    </div>
  )
}
