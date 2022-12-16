import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { showDialog, hideDialog } from "../../store/DialogSlice";
import Link from "next/link";
import styles from "./styles.module.scss";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function DialogModal({ type }) {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state) => ({ ...state }));
  const test = dialog.msgs.find((x) => x.type == "error");

  const handleClose = () => {
    dispatch(hideDialog());
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: "999999999999999",
      }}
    >
      <Dialog
        open={dialog.show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableScrollLock={true}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle
          className={`${styles.header} ${!test ? styles.dialog_success : ""}`}
        >
          {dialog.header}
        </DialogTitle>
        <DialogContent className={styles.body}>
          {dialog.msgs &&
            dialog.msgs.map((msg, i) => (
              <DialogContentText
                className={styles.msg}
                id="alert-dialog-slide-description"
                key={i}
              >
                <img
                  src={
                    msg.type == "error"
                      ? "https://www.freeiconspng.com/uploads/orange-error-icon-0.png"
                      : "https://www.pngmart.com/files/20/Success-Transparent-Background.png"
                  }
                  alt=""
                />
                <span>{msg.msg}</span>
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {dialog.link?.link && (
            <Button>
              <Link href={dialog.link.link}>
                <span>{dialog.link.text}</span>
              </Link>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
