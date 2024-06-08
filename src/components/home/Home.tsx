import styles from "./home.module.css";
import homeImg from "./../../media/homeGroup.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dogsImg from "./../../media/dogs.png";
import catsImg from "./../../media/cats.png";
import lapaImg from "./../../media/lapa.jpg";

export default function Home() {
  const navigate = useNavigate();

  const handlePetsTypeFilter = (petType: string) => {
    navigate(`/pets?petType=${petType}`);
  };

  return (
    <div>
      <div className={styles.home_container}>
        <h1 className={styles.text1}>
          Connecting the hearts of those seeking a faithful friend with those in
          need of loving care!
        </h1>
      </div>
      <div className={styles.homePageContainer}>
        <img src={homeImg} alt="Cat" />
        
        <div className={styles.content_buttons}>
          <div className={styles.content}>
            Our mission is to transform compassion into concrete actions so that
            every homeless animal can find unconditional care and love. We aim to
            become the link between animals that have lost their homes due to war
            or disaster and caring people in Europe who wish to offer them a new
            home and loving hearts. We believe that every animal deserves the
            best, and we do everything we can to help them find a warm home and
            caring owners. Join us in our endeavor to make the world a better
            place!
          </div>
          <div className={styles.round_buttons}>
            <div className={styles.found_pet_btn}>
              <Link className={styles.found_pet_link} to="/found-animal">I found the animal. What do I do?</Link>
            </div>
            <div className={styles.how_work_btn}>
              <Link className={styles.found_pet_link} to="/how-it-works">How it works?</Link>
            </div>
          </div>
        </div>        
      </div>      
      <div className={styles.lookingFor}>
        <h1 className={styles.lookingForTitle}>Looking for a tailed friend</h1>
        <div className={styles.dogs_cats_container}>
          <div
            className={styles.dogs_cats}
            onClick={() => handlePetsTypeFilter("dog")}
          >
            <img src={dogsImg} alt="Dogs" />
            <div className={styles.dogs_cats_body}></div>
          </div>
          <div
            className={styles.dogs_cats}
            onClick={() => handlePetsTypeFilter("cat")}
          >
            <img src={catsImg} alt="Cats" />
            <div className={styles.dogs_cats_body}></div>
          </div>
        </div>
      </div>
      <div className={styles.text_lapa}>
        <p>Where every</p>
        <img src={lapaImg} alt="paw" />
        <p>finds a home!</p>
      </div>
    </div>
  );
}