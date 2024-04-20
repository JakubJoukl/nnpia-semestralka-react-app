import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import "../css/datagrid.css";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import UserContext from "./UserContext";
import moment from "moment";
import MyAlert from "./MyAlert";
import { useState } from "react";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

export default function ServerPaginationGrid({
  columns,
  requestUrl,
  method,
  includeDelete,
  doDeleteAction,
  rowIdSource,
  includeUpdate,
  doUpdateAction,
  trackedDate,
}) {
  const [open, setOpen] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchData = async (
    paginationModel,
    jwtToken,
    method,
    url,
    sortModel
  ) => {
    const { page } = paginationModel;
    let data = null;
    let pageInfo = url.includes("?")
      ? `&pageNumber=${page}&asc=true`
      : `?pageNumber=${page}&asc=true`;

    let sortParams = "";
    for (let i = 0; i < sortModel.length; i++) {
      let paramRow = sortModel[i];
      sortParams += "&sort=" + paramRow.field + "," + paramRow.sort;
    }

    console.log(url + pageInfo + sortParams);

    const response = await fetch(url + pageInfo + sortParams, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        Authorization: "Bearer " + jwtToken,
      },
    }).then((response) => {
      if (response.status == 200 || response.status == 201) {
        data = response.json();
      } else {
        response.text().then((error) => {
          setOpen(true);
          setError("Chyba při requestu: " + error);
        });
      }
    });
    return data;
  };

  const [username, setUsername, jwtToken, setJwtToken] =
    React.useContext(UserContext);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);
  const [canUseDateCall, setCanUseDateCall] = React.useState(false); //ošklivé ošetření bugu
  const [rows, setRows] = React.useState([]);
  const [rowCountState, setRowCountState] = React.useState(0);
  const [requestUrlUsedInRequest, setRequestUrlUsedInRequest] =
    React.useState(requestUrl);

  // Funkce pro vytvoření sloupce Actions
  const createActionsColumn = () => {
    return {
      field: "actions",
      type: "actions",
      headerName: "Akce",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        let returnedRows = [];
        if (includeUpdate != null && doUpdateAction != null) {
          returnedRows.push(
            <GridActionsCellItem
              key={id}
              icon={<AddCircleIcon />}
              label="Update"
              onClick={async () => {
                let result = await doUpdateAction(id).then((response) => {
                  if (response.status == 200 || response.status == 201) {
                    console.log("Request OK");
                  } else {
                    response.text().then((error) => {
                      setOpen(true);
                      setError("Chyba při requestu: " + error);
                    });
                  }
                });
                fetchDataAndUpdateState();
              }}
              color="inherit"
            />
          );
        }
        if (includeDelete != null && doDeleteAction != null) {
          returnedRows.push(
            <GridActionsCellItem
              key={id}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={async () => {
                await doDeleteAction(id).then((response) => {
                  if (response.status == 200 || response.status == 201) {
                    console.log("Request OK");
                  } else {
                    response.text().then((error) => {
                      setOpen(true);
                      setError("Chyba při requestu: " + error);
                    });
                  }
                });
                console.log("PAWNS");
                fetchDataAndUpdateState();
              }}
              color="inherit"
            />
          );
        }
        return returnedRows;
      },
    };
  };

  const fetchDataAndUpdateState = async () => {
    setIsLoading(true);
    console.log(sortModel);
    try {
      const data = await fetchData(
        paginationModel,
        jwtToken,
        method,
        requestUrlUsedInRequest,
        sortModel
      );
      if (data != null && data.data != null) {
        setRows(data.data); // Nastavte nová data
        setRowCountState(data.pocet); // Nastavte celkový počet řádků
      }
    } catch (error) {
      setOpen(true);
      setError("Chyba při requestu: " + error);
    }
    setIsLoading(false);
  };

  // Načtení dat při prvním načtení komponenty nebo změně modelu stránkování
  React.useEffect(() => {
    fetchDataAndUpdateState();
  }, [paginationModel, sortModel]);

  if (trackedDate != null) {
    React.useEffect(() => {
      if (canUseDateCall) {
        if (trackedDate != undefined && trackedDate != null) {
          console.log(trackedDate);
          console.log(requestUrlUsedInRequest);
          setRequestUrlUsedInRequest(
            `http://localhost:8080/api/v1/vypsaneTerminy/${trackedDate["$D"]}-${
              trackedDate["$M"] + 1
            }-${trackedDate["$y"]}`
          );
        }
      } else {
        setCanUseDateCall(true);
      }
    }, [trackedDate]);
  }

  React.useEffect(() => {
    fetchDataAndUpdateState();
  }, [requestUrlUsedInRequest]);

  return (
    <div style={{ width: "100%", flexGrow: 1 }}>
      <DataGrid
        className="myGrid"
        rows={rows}
        getRowId={(row) => row[rowIdSource]}
        columns={
          includeDelete || includeUpdate
            ? [...columns, createActionsColumn()]
            : columns
        }
        rowCount={rowCountState}
        loading={isLoading}
        localeText={{
          noRowsLabel: "Žádné výsledky",
          noResultsOverlayLabel: "Žádné výsledky",
        }}
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        sortingMode="server"
        onSortModelChange={setSortModel}
      />
      {error && (
        <MyAlert open={open} setOpen={setOpen}>
          {error}
        </MyAlert>
      )}
    </div>
  );
}
