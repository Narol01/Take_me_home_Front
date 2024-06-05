import s from "./wantHelp.module.css"
import dogImg_1 from "./../../media/dog1.jpg"
import dogImg_2 from "./../../media/dog2.jpg"
import dogImg_3 from "./../../media/dog3.jpg"

export default function WantHelp() {
  return (
    <div className={s.containerWantHelp}>
      <h2 className={s.h2WantHelp}>I Want to Help</h2>

      <div className={s.block_wantHelp}>
        <p className={s.pWantHelp}>
          Here, you can help animals in need who are in shelters and require not
          only care but also medical assistance. The shelters listed on our
          information platform are overcrowded with animals who have lost their
          homes, human warmth, and love. Volunteer organizations are always
          grateful for any possible help! Every little bit of assistance can
          make a significant difference in the lives of these animals who have
          been through so much.
        </p>
        <p className={s.pWantHelp}>
          To support a chosen volunteer organization (the list of shelters is
          available here), you just need to visit the shelter's website and get
          their details. You can choose how you want to help based on your
          resources and capabilities. Whether it's a one-time donation or
          ongoing support, your contribution is invaluable.
        </p>
      </div>

      <div className={s.block_wantHelp}>
        <h3 className={s.h3WantHelp}>You Can Help in Various Ways</h3>
        <p className={s.pWantHelp}>
          There are numerous ways you can contribute to improving the lives of
          animals in shelters:
        </p>

        <div className={s.sectionWantHelp}>
          <div className={s.imageContainerWantHelp}>
            <img src={dogImg_1} alt="dog" className={s.imageWantHelp} />
          </div>
          <ul className={s.ulWantHelp}>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>Financial Assistance</strong>
              : Transfer money to the shelter's account to cover the costs of
              food, treatment, and animal maintenance. This financial support
              ensures that the shelters can continue to provide essential
              services and care for the animals.
            </li>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>Material Assistance</strong>:
              Donate food, medications, toys, and other necessary items. These
              donations help meet the daily needs of the animals and improve
              their quality of life while they wait for their forever homes.
            </li>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>
                Informational Support
              </strong>
              : Spread information about the shelters and their residents on
              social media to attract more help and find homes for the animals.
              By raising awareness, you can increase the chances of these
              animals finding loving families.
            </li>
          </ul>
        </div>

        <div className={s.sectionWantHelp}>
          <ul className={s.ulWantHelp}>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>Volunteer Time</strong>:
              Spend time at the shelter helping with daily tasks such as
              cleaning, feeding, and walking the animals. Your hands-on
              involvement can make a huge difference in the daily operations of
              the shelter and the well-being of the animals.
            </li>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>Foster Care</strong>: Provide
              temporary homes for animals that need special care or are waiting
              for a permanent home. Fostering is crucial for animals that
              require a more personal touch and a less stressful environment
              than a shelter can provide.
            </li>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>Advocacy</strong>:
              Participate in campaigns and advocacy efforts to improve animal
              welfare laws and policies. Your voice can help bring about
              important changes that protect animals and improve their lives.
            </li>
          </ul>
          <div className={s.imageContainerWantHelp}>
            <img src={dogImg_2} alt="dog" className={s.imageWantHelp} />
          </div>
        </div>

        <div className={s.sectionWantHelp}>
          <div className={s.imageContainerWantHelp}>
            <img src={dogImg_3} alt="dog" className={s.imageWantHelp} />
          </div>
          <ul className={s.ulWantHelp}>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>Skills and Services</strong>:
              Offer your professional skills such as veterinary services,
              photography, or marketing to help shelters run more efficiently.
              Your expertise can provide shelters with resources and services
              they might not otherwise afford, enhancing their operations.
            </li>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>
                Organize Fundraising Events
              </strong>
              : Plan and execute events to raise money and awareness for the
              shelters. Events like charity runs, bake sales, and benefit
              concerts can mobilize the community and generate significant
              support.
            </li>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>Adoption Drives</strong>:
              Assist with organizing and promoting adoption events to find
              permanent homes for shelter animals. These drives are vital for
              giving animals a second chance at a happy life in a loving home.
            </li>
            <li className={s.liWantHelp}>
              <strong className={s.strongWantHelp}>
                Corporate Partnerships
              </strong>
              : Encourage businesses to partner with shelters for donations,
              sponsorships, and volunteer programs. Corporate support can
              provide significant resources and visibility for the shelters.
            </li>
          </ul>
        </div>
      </div>

      <p className={s.pWantHelp}>
        From all the furry friends, THANK YOU FOR YOUR HELP!
      </p>
    </div>
  )
}
