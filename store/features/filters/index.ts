import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filterProps } from "./filterSlice";
import _ from "lodash";
const filterInitState: {
  loading: boolean;
  error: string;
  allFilters: filterProps;
  selectedFilters: filterProps;
} = {
  loading: true,
  error: "",
  allFilters: {
    businessGroups: [],
    region: [],
    country: [],
    products: [],
    retailers: [],
    allStores: [],
    timeRange: {
      startDate: "",
      endDate: "",
    },
  },
  selectedFilters: {
    businessGroups: [],
    region: [],
    country: [],
    products: [],
    retailers: [],
    allStores: [],
    timeRange: {
      startDate: "",
      endDate: "",
    },
  },
};

export const fetchFilters: any = createAsyncThunk(
  "user/addUser",
  async (params) => {
    const filterData: any = await new Promise<any>((resolve, reject) => {
      setTimeout(
        () =>
          resolve({
            businessGroups: ["personal care", "non personal care"],
            region: ["lat-am", "south-Asia"],
            country: ["Brazil", "India", "equador"],
            products: ["deodorants"],
            retailers: ["wallmart", "soriana"],
            allStores: ["store1", "store2", "store3"],
            timeRange: {
              startDate: "",
              endDate: "",
            },
          }),
        1000
      );
    });
    return filterData;
  }
);

export const filterSlice = createSlice({
  name: "filters",
  initialState: filterInitState,
  reducers: {
    addFilter: (state: any, action: any) => {
      state.selectedFilters[action.payload.filterType].push(
        action.payload.newValue
      );
    },
    deleteFilter: (state: any, action: any) => {
      _.remove(
        state.selectedFilters[action.payload.filterType],
        (filterVal) => {
          return filterVal === action.payload.valueToRemove
        }
      );
    },
    selectAllFilter: (state: any, action: any) => {
      state.selectedFilters[action.payload.filterType] = state.allFilters[action.payload.filterType]
    },
    deleteAllFilter: (state:any, action:any) => {
      state.selectedFilters[action.payload.filterType] = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.loading = false;
      state.allFilters = action.payload;
      const { businessGroups, region, country, products, retailers, allStores } =
        action.payload;
      state.selectedFilters = {
        businessGroups: [businessGroups[0]],
        region: [region[0]],
        country: [country[0]],
        products: [products[0]],
        retailers: [],
        allStores: [allStores[0]],
        timeRange: {
          startDate: "",
          endDate: "",
        },
      };
    });
    // builder.addCase(fetchFilters.rejected)
  },
});

export default filterSlice.reducer;
export const { addFilter, deleteFilter, selectAllFilter, deleteAllFilter } = filterSlice.actions;
