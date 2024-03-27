import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "./todoList/toDoSlice";

export const store = configureStore({
    reducer: {
        todos: toDoSlice
    }
})
