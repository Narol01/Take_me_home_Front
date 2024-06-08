import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { getPetsByFilter } from "../../features/pets/petsSlice";
import s from "./personalCabinet.module.css";
import Profile from "./profile/Profile";
import Adverts from "./adverts/Adverts";
import Chat from "./chat/Chat";
import { selectUser } from "../../features/auth/authSlice";

export default function PersonalCabinet() {

  const { author } = useParams<{ author: string }>();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPetsByFilter({ author }));
  }, [dispatch, author]);

  return (
    <div className={s.cabinet}>
      <Profile />
      <div className={s.avert_container}>
      <Link className={s.link_create_pet} to="/create-pet/">{`Hello, ${user?.fullName}! Create a new pet avert`}</Link>
        <Adverts />
      </div>
      <div className={s.chat_container}>
        <Chat />
      </div>
    </div>
  );
}