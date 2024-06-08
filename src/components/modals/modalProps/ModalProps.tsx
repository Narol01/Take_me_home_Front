import React from "react";
import ReactDOM from "react-dom";
import s from "./modalProps.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={s.modal_overlay}>
      <div className={s.modal}>
        <div className={s.modal_header}>
          <h2>{title}</h2>
          <button onClick={onClose} className={s.close_button}>
            &times;
          </button>
        </div>
        <div className={s.modal_body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
