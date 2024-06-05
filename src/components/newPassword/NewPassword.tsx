import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { changePassword, selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "./newPassword.module.css"

export default function NewPassword() {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({oldPassword: '', newPassword: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(changePassword(passwordData)); 
      alert('Password changed successfully');
      navigate(`/personalCabinet/${currentUser?.login}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error changing password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box_front}>
      <h2>Change Password</h2>
      <h1>{currentUser?.login}</h1>
      <form onSubmit={handleSubmit}>
      <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handleChange}
            required
          />
        <button type="submit">Change</button>
      </form>
    </div>
    </div>
  );
}