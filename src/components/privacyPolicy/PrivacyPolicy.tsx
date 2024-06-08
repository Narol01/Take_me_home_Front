import React from 'react';
import s from './privacyPolicy.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={s.container}>
      <h1 className={s.heading}>Privacy Policy</h1>
      <p className={s.intro}>
        User Agreement (English)
        Effective Date: [Date]
      </p>
      <p className={s.paragraph}>
        Welcome to our website [Take me home]!
        Please read this user agreement (hereinafter referred to as the "Agreement") carefully before using our website [Website URL] (hereinafter referred to as the "Site"). This Agreement governs the terms of use of our Site.
      </p>
      <h2 className={s.sectionTitle}>1. Acceptance of Terms</h2>
      <p className={s.paragraph}>
        By using our Site, you agree to these terms. If you do not agree with these terms, please do not use our Site.
      </p>
      <h2 className={s.sectionTitle}>2. Privacy</h2>
      <p className={s.paragraph}>
        We comply with GDPR and other applicable data protection laws. For detailed information, please refer to our Privacy Policy [link to Privacy Policy].
      </p>
      <h2 className={s.sectionTitle}>3. Use of the Site</h2>
      <p className={s.paragraph}>
        You agree to use our Site in accordance with applicable laws and not to infringe upon the rights of third parties.
      </p>
      <h2 className={s.sectionTitle}>4. Intellectual Property</h2>
      <p className={s.paragraph}>
        All materials presented on the Site are protected by copyright and other intellectual property laws. Use of these materials without our permission is prohibited.
      </p>
      <h2 className={s.sectionTitle}>5. Limitation of Liability</h2>
      <p className={s.paragraph}>
        We are not liable for any damages resulting from the use of our Site.
      </p>
      <h2 className={s.sectionTitle}>6. Changes to the Agreement</h2>
      <p className={s.paragraph}>
        We reserve the right to change this Agreement at any time. Changes will take effect upon being posted on the Site.
      </p>
      <h2 className={s.sectionTitle}>7. Contact Information</h2>
      <p className={s.paragraph}>
        If you have any questions about this Agreement, please contact us at: [email address].
      </p>
    </div>
  );
}
