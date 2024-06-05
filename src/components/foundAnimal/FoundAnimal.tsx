import React from 'react';
import styles from './foundAnimal.module.css';

export default function FoundAnimal() {
  return (
    <div className={styles.container_found_pet}>
      <h1 className={styles.heading}>I found an animal on the street.</h1>
      <p className={styles.subHeading}>What do I do?</p>
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Ensure Safety:</h2>
        <p className={styles.paragraph}>
          If you find a stray animal on the street, first make sure that there is no danger to you and the animal. Try to approach it slowly and carefully, avoiding sudden movements to not scare the animal.
        </p>
        
        <h2 className={styles.sectionTitle}>Assess the Animal's Condition:</h2>
        <p className={styles.paragraph}>
          Look at the condition of the animal. It may be scared, injured, hungry, or thirsty. Approach it carefully, avoiding frightening it.
        </p>
        
        <h2 className={styles.sectionTitle}>Identification Signs:</h2>
        <p className={styles.paragraph}>
          If there is a collar, check for a tag, capsule, or writing on the collar with contact information. Call the number provided. In a veterinary clinic, a chip can be detected with a special reader. The reader beeps and shows the animal's number when a chip is detected. The owner can be found through the chip database.
        </p>
        
        <h2 className={styles.sectionTitle}>Contact Local Authorities or Shelters:</h2>
        <p className={styles.paragraph}>
          If you cannot take the animal with you, contact local animal shelters or animal welfare organizations. They can help you with temporary or permanent accommodation for the animal.
        </p>
        
        <h2 className={styles.sectionTitle}>Provide Information:</h2>
        <p className={styles.paragraph}>
          If the animal seems lost, you can try to find its owner by posting an announcement on social media, local newspapers, or animal shelters.
        </p>
        
        <h2 className={styles.sectionTitle}>Provide First Aid:</h2>
        <p className={styles.paragraph}>
          If the animal needs medical help, contact a local veterinarian or animal shelter. Do not try to provide medical assistance yourself if you are not a professional.
        </p>
        
        <h2 className={styles.sectionTitle}>How to Find a New Owner:</h2>
        <p className={styles.paragraph}>
          Utilize all possibilities to find a home for the animal. Post on social media, place ads in local newspapers.
        </p>
      </div>
    </div>
  );
}
