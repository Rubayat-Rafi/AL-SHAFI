import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./slices/slice";
export const store = configureStore( Slice );
