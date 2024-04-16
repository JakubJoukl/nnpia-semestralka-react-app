import { Collapse, Alert, IconButton, Snackbar } from "@mui/material";
import React from "react";

/*interface Props {
  children: string;
  open: boolean;
  setOpen: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}*/

function MyAlert({ children, open, setOpen }) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        sx={{
          minHeight: "unset",
          borderRadius: "0px",
        }}
        variant="filled"
        severity="error"
        onClick={() => {
          setOpen(false);
        }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}

export default MyAlert;
