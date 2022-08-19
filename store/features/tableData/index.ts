import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { osaGrowthOpportunitiesTableProps } from "./tableData";
import tableData from '../../../public/data/tableData.json'

const tableInitialState: { tableData: osaGrowthOpportunitiesTableProps[] } = {
  tableData: []
};

export const fetchTableData = () => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(
      () =>
        resolve(tableData)
    );
  });
};

export const osaTableDataSlice = createSlice({
  name: "tableData",
  initialState: tableInitialState,
  reducers: {
    getTableData: (state, action: PayloadAction<osaGrowthOpportunitiesTableProps[]>) => {
      state.tableData = action.payload;
    },
  },
});
export const { getTableData } = osaTableDataSlice.actions;
export default osaTableDataSlice.reducer;
