import { Collapse, Alert, IconButton } from "@mui/material";
import React from "react";

interface Props {
  children: string;
}

function MyAlert({ children }: Props) {
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState(children);

  React.useEffect(() => {
    handleMessage();
  }, [message]);

  function handleMessage() {
    try {
      let decodedMessage = JSON.parse(message);
      let messageWithRows = "";
      decodedMessage.forEach((element: string) => {
        messageWithRows += element + "/n";
      });
      setMessage(messageWithRows);
    } catch (e) {
      setMessage(message);
    }
  }

  return (
    <Collapse in={open}>
      <Alert
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
