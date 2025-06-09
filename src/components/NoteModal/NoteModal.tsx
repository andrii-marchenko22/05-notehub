import { NoteForm } from "../NoteForm/NoteForm";
import css from "./NoteModal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface NoteModalProps {
  onClose: () => void;
}

export const NoteModal = ({ onClose }: NoteModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};
