import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userProps } from "./user";

const userInitState: { user: userProps } = {
  user: { userId: "1", displayName: "", emailId: "", avatarLink: "", role: "", profile: "" },
};

export const fetchUser = () => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          name: "Maithrey Roy",
          emailId: "maithrey.roy@unilever.com",
          avatarLink: "https://joeschmoe.io/api/v1/random",
          role: "global",
          profile: "Key Account manager",
        }),
      1000
    );
  });
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitState,
  reducers: {
    addUser: (state, action: PayloadAction<userProps>) => {
      state.user = { ...action.payload };
    },
  },
});
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
