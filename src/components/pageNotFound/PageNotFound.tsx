import s from "./page.NotFound.module.css"
import { Link } from "react-router-dom"
import dog from "./../../media/glass-dog.jpg"

export default function PageNotFound() {
  return (
    <div className={s.body_pnf}>
      <img src={dog} alt="" />
      <div className={s.container_pnf}>
        <h1 className={s.heading_pnf}>404 Not Found</h1>
        <p className={s.message_pnf}>
          Sorry! The page you are looking for doesn't exist
        </p>
        <Link to="/" className={s.button_pnf}>
          Go to Homepage
        </Link>
      </div>
      
    </div>
  )
}
