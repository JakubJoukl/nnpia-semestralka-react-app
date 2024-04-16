import { Collapse, Alert, IconButton } from "@mui/material";
import React from "react";

interface Props {
  children: string;
}

function MyAlert({ children }: Props) {
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState(children);

  return (
    <Collapse
      in={open}
      sx={{
        minHeight: "unset",
        borderRadius: "0px",
      }}
    >
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
        {message}
      </Alert>
    </Collapse>
  );
}

export default MyAlert;
