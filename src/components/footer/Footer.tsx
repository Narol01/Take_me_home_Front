import React, { useEffect, useState } from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.footerContainer} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.footerContent}>
        <p>© All rights reserved</p>
        <p>© 2024 Team Students of the AIT TR School</p>
        <p>© Volunteer site for helping animals "Take me home"</p>
        <a href="https://www.ait-tr.de/en" target="_blank" className={styles.aFooter}>© www.ait-tr.de</a>
      </div>
    </div>
  );
}
