import React from "react"
import { Link } from "react-router-dom"
import styles from "./footer.module.css"
export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p>© All rights reserved</p>
      <p>© 2024 Team Students of the AIT TR School</p>
      <p>© Volunteer site for helping animals "Take me home"</p>
 
      <a href="https://www.ait-tr.de" target="blank" className={styles.a_footer}>© www.ait-tr.de</a>
     


    </div>
  )
}
