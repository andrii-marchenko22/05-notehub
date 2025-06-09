import NoteForm from "../NoteForm/NoteForm";
import css from "./NoteModal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
}

export const NoteModal = ({ onClose }: ModalProps) => {
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal}>
        <NoteForm />
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
};
