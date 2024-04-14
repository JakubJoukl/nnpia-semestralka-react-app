import React, { useContext } from "react";
import DataGridComponent from "./DataGridComponent";
import { GridActionsCellItem } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import UserContext from "./UserContext";
import moment from "moment";

function MyTermsPage() {
  const [username, setUsername, jwtToken, setJwtToken] =
    useContext(UserContext);

  return (
    <DataGridComponent
      columns={[
        {
          field: "stavRezervace",
          headerName: "Stav rezervace",
          width: 200,
        },
        {
          field: "vypsanyTermin",
          headerName: "Trvání od",
          type: "datetime",
          width: 200,
          valueFormatter: (value, row) =>
            moment(row.vypsanyTermin.trvaniOd).format("DD-MM-YYYY HH:mm"),
        },
        {
          field: "trvaniDo",
          headerName: "Trvání do",
          type: "datetime",
          width: 200,
          valueFormatter: (value, row) =>
            moment(row.vypsanyTermin.trvaniDo).format("DD-MM-YYYY HH:mm"),
        },
        {
          field: "omezeniTerminu",
          headerName: "Omezení termínu",
          type: "text",
          flex: 1,
          valueGetter: (value, row) => row.vypsanyTermin.omezeniTerminu,
        },
        {
          field: "poznamkaLekare",
          headerName: "Poznámka lékaře",
          flex: 1,
        },
      ]}
      requestUrl={`http://localhost:8080/api/v1/terminyUzivatele/budouci`}
      method={`GET`}
      includeDelete={true}
      doDeleteAction={async (id) => {
        await fetch(
          "http://localhost:8080/api/v1/terminyUzivatele/zrusRezervaciTerminu",
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
      rowIdSource={"rezervaceTerminuId"}
      includeUpdate={false}
      doUpdateAction={null}
      trackedDate={null}
    ></DataGridComponent>
  );
}

export default MyTermsPage;
