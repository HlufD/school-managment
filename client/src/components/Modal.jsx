import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";
import React from "react";

function Modal({ children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <div></div>;
}

export default Modal;
