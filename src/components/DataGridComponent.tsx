import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
} from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import "../css/datagrid.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import UserContext from "./UserContext";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

// Vlastní asynchronní funkce pro získání dat
const fetchData = async (paginationModel, jwtToken) => {
  const { page, pageSize } = paginationModel;
  // Zde provedete svůj asynchronní požadavek na získání dat z vašeho API
  // Například:
  const response = await fetch(
    `http://localhost:8080/api/v1/terminyUzivatele/?pageNumber=${page}&asc=true`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        Authorization: "Bearer " + jwtToken,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export default function ServerPaginationGrid({
  columns,
  requestForData,
  deleteFunction,
}) {
  const [username, setUsername, jwtToken, setJwtToken] =
    React.useContext(UserContext);

  const cols: GridColDef[] = [
    {
      field: "stavRezervace",
      headerName: "Stav rezervace",
      width: 200,
    },
    {
      field: "vypsanyTermin",
      headerName: "Trvání termínu od",
      flex: 1,
      valueGetter: (params) => {
        //console.log(params);
        return params.trvaniOd;
      },
    },
    {
      field: "vypsanyTermin",
      headerName: "Trvání termínu do",
      flex: 1,
      valueGetter: (params) => {
        //console.log(params);
        return params.trvaniDo;
      },
    },
    {
      field: "poznamkaLekare",
      headerName: "Poznámka lékaře",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    // Další sloupce...
  ];

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [rowCountState, setRowCountState] = React.useState(0);

  const handleDeleteClick = (id: GridRowId) => () => {
    console.log(id);
    fetchDataAndUpdateState();
  };

  const fetchDataAndUpdateState = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData(paginationModel, jwtToken);
      setRows(data.data); // Nastavte nová data
      setRowCountState(data.pocet); // Nastavte celkový počet řádků
    } catch (error) {
      console.error("Chyba při načítání dat:", error);
    }
    setIsLoading(false);
  };

  // Načtení dat při prvním načtení komponenty nebo změně modelu stránkování
  React.useEffect(() => {
    fetchDataAndUpdateState();
  }, [paginationModel]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        className="myGrid"
        rows={rows}
        getRowId={(row) => row.rezervaceTerminuId}
        columns={cols}
        rowCount={rowCountState}
        loading={isLoading}
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}
