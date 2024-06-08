import React from "react";
import s from "./modalDeleteAccount.module.css";

type ModalDelUserProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalDeleteAccount: React.FC<ModalDelUserProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={s.modal_overlay}>
      <div className={s.modal}>
        <h2>Are you sure about that? Maybe you should wait a while?</h2>
        <div className={s.modal_actions}>
          <button onClick={onConfirm} className={s.modal_button}>
            Yes
          </button>
          <button onClick={onClose} className={s.modal_button}>
            Cansel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteAccount;
