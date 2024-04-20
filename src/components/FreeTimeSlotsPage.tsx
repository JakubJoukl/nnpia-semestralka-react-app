import React, { useContext } from "react";
import DataGridComponent from "./DataGridComponent";
import moment from "moment";
import UserContext from "./UserContext";

function FreeTimeSlotsPage() {
  const [username, setUsername, jwtToken, setJwtToken] =
    useContext(UserContext);

  return (
    <DataGridComponent
      requestUrl={`http://localhost:8080/api/v1/vypsaneTerminy/`}
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
        return fetch(
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
      trackedDate={null}
    ></DataGridComponent>
  );
}

export default FreeTimeSlotsPage;
