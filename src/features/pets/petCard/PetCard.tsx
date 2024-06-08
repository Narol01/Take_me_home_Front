import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useEffect, useState } from "react"
import style from "./PetCard.module.css"
import { getPet, selectPet } from "../petsSlice"
import PageNotFound from "../../../components/pageNotFound"
import { author, selectUser } from "../../auth/authSlice"
import { User, UserUpdateDto } from "../../auth/types"
import Modal from "../../../components/modals/modalProps/ModalProps"

export default function PetCard() {
  const currentUser = useAppSelector(selectUser)
  const { petId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const pet = useAppSelector(selectPet)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)
  const [userData, setUserData] = useState<UserUpdateDto | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    if (petId) {
      dispatch(getPet(Number(petId)))
    }
  }, [dispatch, petId])

  useEffect(() => {
    if (pet && pet.photoUrls && pet.photoUrls.length > 0) {
      setCurrentPhotoIndex(0)
    }
  }, [pet])

  const handleNextPhoto = () => {
    if (pet && pet.photoUrls) {
      setCurrentPhotoIndex(prevIndex => (prevIndex + 1) % pet.photoUrls.length)
    }
  }

  const handlePreviousPhoto = () => {
    if (pet && pet.photoUrls) {
      setCurrentPhotoIndex(
        prevIndex =>
          (prevIndex - 1 + pet.photoUrls.length) % pet.photoUrls.length,
      )
    }
  }

  const handleUser = async () => {
    if (currentUser && pet && pet.author) {
      try {
        const response = await dispatch(author(pet.author))
        const userData = response.payload as User

        const handleSendEmail = () => {
          const subject = encodeURIComponent("Interest in your pet ad")
          const body = encodeURIComponent(
            `Hello,\n\n I am interested in your announcement: ${pet.caption}.`,
          )
          window.location.href = `mailto:${userData.email}?subject=${subject}&body=${body}`
        }

        if (userData && "fullName" in userData) {
          setUserData(userData)
          setModalContent(
            <div className={style.modal_content}>
              <p>Name: {userData.fullName}</p>              
              <p>Phone: {userData.phone}</p>
              <p>Telegram: {userData.telegram}</p>
              <p>Website:
              <a 
                href={`https://${userData?.website}`} 
                target="_blank" rel="noopener noreferrer">
                 {` ${userData?.website}`}
              </a> 
              </p>
              <p className={style.p_email}>Email:
                <button onClick={handleSendEmail}>{` ${userData.email}`}</button>
              </p>
                      
                   
            </div>,
          )
          setIsModalOpen(true)
        }
      } catch (error) {
        console.error("Error in retrieving author data: ", error)
      }
    } else {
      localStorage.setItem("redirectAfterLogin", window.location.pathname)
      navigate("/login-form")
    }
  }

  if (!pet) {
    return <PageNotFound />
  }
  return (
    <div className={style.container_pet_card}>
      <div className={style.box_petCard}>
        <div className={style.pet_card_date}>
          <p className={style.pet_card_createdate}>
            Date of creation: {pet.dateCreate}
          </p>
          <button onClick={() => navigate(-1)} className={style.back_button}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={style.petCard_parameters}>
          <p>Category: {pet.category}</p>
          <p>Sex: {pet.gender}</p>
          <p>Age: {pet.age}</p>
        </div>

        <div className={style.petCard_main}>
          <div className={style.petCard_photo_container}>
            {pet.photoUrls && pet.photoUrls.length > 0 && (
              <>
                <img
                  src={`${"https://take-me-home-sqbog.ondigitalocean.app"}${pet.photoUrls[currentPhotoIndex]}`}
                  // https://localhost:8080
                  alt={`Pet ${currentPhotoIndex}`}
                />
                <div className={style.photo_navigation}>
                  <button onClick={handlePreviousPhoto}>&lt;</button>
                  <button onClick={handleNextPhoto}>&gt;</button>
                </div>
              </>
            )}
          </div>
          <div className={style.petCard_caption_description}>
            <h2 className={style.petCard_caption}>{pet.caption}</h2>
            <p className={style.petCard_description}>{pet.description}</p>
          </div>
        </div>

        <div className={style.petCard_location_author}>
          <div className={style.petCard_location}>
            <p>{pet.country}</p>
            <p>{pet.city}</p>
          </div>

          <div className={style.petCard_author}>
            <p>Author: {pet.author}</p>
            <button
              className={style.petCard_authorContacts}
              onClick={handleUser}
            >
              Contacts
            </button>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Contact details:"
        >
          {modalContent}
        </Modal>
      </div>
    </div>
  )
}