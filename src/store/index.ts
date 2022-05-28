import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";
import { projectListSlice } from "screens/project-list/project-list.slice";
import { authSlice } from "./auth.slice";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
