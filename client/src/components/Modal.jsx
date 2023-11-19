import ReactDOM from "react-dom";
import { FaRegWindowClose } from "react-icons/fa";
import("../styles/modal.scss");
import { useDispatch, useSelector } from "react-redux";
import { close } from "../app/feauters/modal/modalSlice";

const Modal = ({ children, title }) => {
  const { isOpend } = useSelector((store) => store.Modal);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(close());
  };
  if (!isOpend) return null;
  return ReactDOM.createPortal(
    <>
      <div className="overlay" />

      <div>
        <div className="modal-content">
          <div className="modal-header">
            <p>{title}</p>
            <span>
              <FaRegWindowClose onClick={onClose} />
            </span>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
