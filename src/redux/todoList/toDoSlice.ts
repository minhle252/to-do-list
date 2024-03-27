import { ToDoSlice } from "@/service/styles";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ToDoSlice[] = [
  {
    id: "1",
    showView: true,
    name: "Do homework",
    selected: true,
    dueDate: "",
    piority: "nomal",
    des: "Description of Post 1",
  },
  {
    id: "2",
    showView: true,
    name: "Do housework",
    selected: false,
    dueDate: "",
    piority: "low",
    des: "Description of Post 2",
  },
  {
    id: "3",
    showView: true,
    name: "Do something",
    selected: false,
    dueDate: "",
    piority: "nomal",
    des: "Description of Post 3",
  },
];

const toDoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<any>) => {
      const { id, name, dueDate, piority, des,showView } = action.payload;
      const toDoIndex = state.findIndex((item: any) => item.id === id);
      if (toDoIndex !== -1) {
        state[toDoIndex].name = name;
        state[toDoIndex].des = des;
        state[toDoIndex].showView = showView;
        state[toDoIndex].dueDate = dueDate;
        state[toDoIndex].piority = piority;
      }
    },
    removeTodo: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      return state.filter((item: any) => item.id !== id);
    },
    removeTodoMultiple: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      return state.filter((item: any) => !payload.includes(item.id));
    },
    togleFormTask: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      state.forEach((item:any) => {
        if (payload.includes(item.id)) {
          item.selected = !item.selected;
        }
      });
    },
    findToDoByName: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      if(payload.length > 0) {
        state.forEach((item:any) => {
          if(item.name.toLocaleLowerCase().indexOf(payload.toLocaleLowerCase()) === -1){
            item.showView = false;
          }else{
            item.showView = true;
          }
        });
      }else{
        state.forEach((item:any) => {
          item.showView = true;
        });
      }
    },
  },
});

export const { addTodo,updateTodo,removeTodo,togleFormTask,removeTodoMultiple,findToDoByName } = toDoSlice.actions;
export default toDoSlice.reducer;
