import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainLayout from "./layouts/mainLayout/MainLayout"
import Home from "./components/home/Home"
import PetsList from "./features/pets/petsList/PetsList"
import PetCard from "./features/pets/petCard/PetCard"
import PersonalCabinet from "./components/personalCabinet/PersonalCabinet"
import Register from "./components/register/Register"
import LoginForm from "./components/login/LoginForm"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { checkAuth, selectIsAuthenticated, user } from "./features/auth/authSlice"
import CreatePet from "./features/pets/createPet/CreatePet"
import NewPassword from "./components/newPassword/NewPassword"
import EditUser from "./components/editUser/EditUser"
import UserList from "./features/auth/userList/userList"
import EditPet from "./features/pets/editPet/editPet"
import AdminCabinet from "./components/adminCabinet/AdminCabinet"
import UserPetsList from "./components/adminCabinet/userPetsList/UserPetsList"
import WantHelp from "./components/wantHelp/WantHelp"
import PageNotFound from "./components/pageNotFound"
import Chat from "./components/personalCabinet/chat/Chat"
import FoundAnimal from "./components/foundAnimal/FoundAnimal"
import Adverts from "./components/personalCabinet/adverts/Adverts"
import Profile from "./components/personalCabinet/profile/Profile"
import HowItWorks from "./components/howItWorks/HowItWorks"
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy"

const App = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(user())
    }
  }, [isAuthenticated])

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login-form" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="personal-cabinet/:author" element={<PersonalCabinet />} />
          <Route path="chat" element={<Chat />} />
          <Route path="adverts" element={<Adverts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin-cabinet" element={<AdminCabinet />} />
          <Route path="/user/:login/pets" element={<UserPetsList />} />
          <Route path="edit-user" element={<EditUser />} />
          <Route path="edit-pet/:petId" element={<EditPet />} />
          <Route path="new-password" element={<NewPassword />} />
          <Route path="create-pet" element={<CreatePet />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="pets" element={<PetsList />} />
          <Route path="pet-card/:petId" element={<PetCard />} />
          <Route path="want-help" element={<WantHelp />} />
          <Route path="found-animal" element={<FoundAnimal />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
