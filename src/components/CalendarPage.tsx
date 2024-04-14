import React, { useContext, useState } from "react";
import Calendar from "./Calendar";
import DataGridComponent from "./DataGridComponent";
import moment from "moment";
import UserContext from "./UserContext";

export default function CalendarPage() {
  const [username, setUsername, jwtToken, setJwtToken] =
    useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <>
      <Calendar onUpdateDate={handleDateChange}></Calendar>
      <DataGridComponent
        requestUrl={`http://localhost:8080/api/v1/vypsaneTerminy/${moment(
          selectedDate
        ).format("DD-MM-yyyy")}`}
        method={`GET`}
        columns={[
          {
            field: "trvaniOd",
            headerName: "Trvání od",
            type: "datetime",
            width: 200,
            valueFormatter: (value, row) =>
              moment(row.trvaniOd).format("DD-MM-YYYY HH:mm"),
          },
          {
            field: "trvaniDo",
            headerName: "Trvání do",
            type: "datetime",
            width: 200,
            valueFormatter: (value, row) =>
              moment(row.trvaniDo).format("DD-MM-YYYY HH:mm"),
          },
          {
            field: "omezeniTerminu",
            headerName: "Omezení termínu",
            flex: 1,
          },
          // Další sloupce...
        ]}
        rowIdSource={"vypsanyTerminId"}
        includeDelete={false}
        doDeleteAction={null}
        includeUpdate={true}
        doUpdateAction={async (id) => {
          await fetch(
            "http://localhost:8080/api/v1/vypsaneTerminy/vytvorRezervaci",
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwtToken,
              },
              body: id,
            }
          );
        }}
        trackedDate={selectedDate}
      ></DataGridComponent>
    </>
  );
}
