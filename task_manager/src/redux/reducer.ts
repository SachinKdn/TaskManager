import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: object;
}

interface UsersSlice {
  isLoading: boolean;
  users: object[];
  tasks: object[];
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
  loading: true,
  user : {}
};
const initialStateUsers: UsersSlice = {
  isLoading: true,
  users : [],
  tasks: []
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setUser: (state,action: PayloadAction<{user: object}>)=>{
        state.user = action.payload.user;
    },
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    resetTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
    },
  },
});

export const usersSlice = createSlice({
  name: "users",
  initialState : initialStateUsers,
  reducers:{
    setIsLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.isLoading = action.payload.loading;
    },
    setUsers: (state,action: PayloadAction<{users: object[]}>)=>{
        state.users = action.payload.users;
    },
    setTasks: (state,action: PayloadAction<{tasks: object[]}>)=>{
      state.tasks = action.payload.tasks;
    }
  }
})

export const { setLoading, setTokens, resetTokens ,setUser} = authSlice.actions;

export const { setIsLoading ,setUsers, setTasks} = usersSlice.actions;

export default authSlice.reducer;
