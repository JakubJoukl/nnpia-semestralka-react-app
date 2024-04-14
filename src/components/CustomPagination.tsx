import Pagination from "@mui/material/Pagination";
import {
  useGridApiContext,
  useGridSelector,
  gridPaginationModelSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";

export default function CustomPagination() {
  const apiRef = useGridApiContext();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      count={pageCount}
      page={paginationModel.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
