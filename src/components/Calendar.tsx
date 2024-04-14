import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "../css/myCalendar.css";

export default function Calendar({ onUpdateDate }) {
  const [chosenDate, setChosenDate] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        className="myCalendar"
        value={chosenDate}
        onChange={(newChosenDate) => {
          onUpdateDate(newChosenDate);
          setChosenDate(newChosenDate);
        }}
      />
    </LocalizationProvider>
  );
}
