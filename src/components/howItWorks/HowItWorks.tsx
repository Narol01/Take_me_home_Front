import React from "react"
import s from "./howItWorks.module.css"
import dogImg_4 from "./../../media/dog4.jpg"
import dogImg_5 from "./../../media/dog5.jpg"

export default function HowItWorks() {
  return (
    <div className={s.container_howWork}>
      <h2 className={s.heading_howWork}>How It Works</h2>
      <p className={s.intro_howWork}>
        Our website dedicated to helping homeless animals provides a valuable
        platform for those who seek to find a new home for abandoned animals.
        The work of our website includes several key aspects:
      </p>

      <div className={s.section_howWork}>
        <div className={s.imageContainerHowWork}>
          <img src={dogImg_4} alt="dog" className={s.imageHowWork} />
        </div>
        <div className={s.blockUl_howWork}>
          <ul className={s.list_howWork}>
            <li className={s.listItem_howWork}>
              <h2 className={s.listItemTitle_howWork}>Posting Ads</h2>
              <p className={s.paragraph_howWork}>
                Anyone who finds a stray animal can easily place an ad about it
                on our website. This may include information about the animal,
                its photos, age, gender, breed (if known), as well as contact
                information to contact those interested in adoption.
              </p>
            </li>
            <li className={s.listItem_howWork}>
              <h2 className={s.listItemTitle_howWork}>Animal Search</h2>
              <p className={s.paragraph_howWork}>
                Site visitors can use the search functionality to find animals
                they could adopt. This allows them to view available ads, filter
                the results by various parameters (for example, type of animal,
                location, etc.) and find suitable candidates for adoption.
              </p>
            </li>
           
          </ul>
        </div>
      </div>

      <div className={s.section_howWork}>
        <div className={s.blockUl_howWork}>
        <ul className={s.list_howWork}>
        <li className={s.listItem_howWork}>
              <h2 className={s.listItemTitle_howWork}>Communication</h2>
              <p className={s.paragraph_howWork}>
                Our site also provides a means of communication between those
                who posted an ad about an animal and potential adoptive parents.
                This can be a built-in messaging system or specifying contact
                information for direct communication.
              </p>
            </li>
        <li className={s.listItem_howWork}>
          <h2 className={s.listItemTitle_howWork}>Educational Content</h2>
          <p className={s.paragraph_howWork}>
            Our website may contain information on how to care for animals, the
            adoption process, the importance of sterilization, etc. This helps
            to keep visitors informed and increases the likelihood of a
            successful adoption.
          </p>
        </li>
        <li className={s.listItem_howWork}>
          <h2 className={s.listItemTitle_howWork}>Community Support</h2>
          <p className={s.paragraph_howWork}>
            Creating a community of support and sharing experiences can also be
            an important aspect of our website. This may include forums, blogs,
            the ability to share adoption stories and photos of new animal
            homes.
          </p>
        </li>
      </ul>
        </div>
        <div className={s.imageContainerHowWork}>
          <img src={dogImg_5} alt="dog" className={s.imageHowWork} />
        </div>
      </div>
      
      <p className={s.conclusion}>
        The overall result of our website is that it facilitates the adoption
        process and helps more homeless animals to be found by caring and loving
        families.
      </p>
    </div>
  )
}
