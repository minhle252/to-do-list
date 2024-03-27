"use client";
import FormTaskComponent from "@/components/formTaskComponent";
import ToDoItemComponent from "@/components/toDoItemComponent";
import {
  findToDoByName,
  removeTodoMultiple,
  togleFormTask,
} from "@/redux/todoList/toDoSlice";
import CONSTANTS from "@/service/constants";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const dispatch = useDispatch();

  const todos = useSelector((state: any) => state.todos);
  const [listId, setListId] = useState<any[]>([]);
  const changeListId = (event: any) => {
    let target = event.target;
    if (target.checked) {
      setListId([...listId, target.value]);
    } else {
      let listIdNew = listId.filter((item: any) => item != target.value);
      setListId(listIdNew);
    }
  };
  // Show/Hide to do item Multiple
  const toggleMultiple = () => {
    if (listId.length > 0) {
      dispatch(togleFormTask(listId));
    } else {
      CONSTANTS.showToastFunc(
        "You haven't selected the to do item yet!",
        "error",
      );
    }
  };
  // remove to do item multiple
  const removeMultiple = () => {
    if (listId.length > 0) {
      let text = "do you want to delete it?";
      if (confirm(text) == true) {
        dispatch(removeTodoMultiple(listId));
        setListId([]);
        CONSTANTS.showToastFunc("Delete to do item successfully!", "success");
      }
    } else {
      CONSTANTS.showToastFunc(
        "You haven't selected the to do item yet!",
        "error",
      );
    }
  };
  return (
    <div className="container flex border border-2 border-gray-600 mt-5 h-[95vh]">
      <div className="box_new_task w-5/12 border-r-2 border-gray-600 px-10 py-5">
        <h4 className="text-center font-bold my-5">News Task</h4>
        <FormTaskComponent btnText="Add" />
      </div>
      <div className="box_to_do_list flex flex-col flex-1 pt-5">
        <div className="flex-1 px-10">
          <h4 className="text-center font-bold my-5">To do list</h4>
          <input
            type="text"
            placeholder="Search..."
            defaultValue={""}
            onChange={(event: any) =>
              dispatch(findToDoByName(event.target.value))
            }
            className="w-full px-2 py-1 "
          />
          <div className="overflow-auto h-[calc(95vh-236px)] mt-5">
            {todos?.map((item: any, index: number) =>
              item.showView ? (
                <ToDoItemComponent
                  key={index}
                  selectedItem={listId.includes(item.id)}
                  valueChecked={item.id}
                  changeEvent={(event: any) => changeListId(event)}
                  item={item}
                />
              ) : (
                ""
              ),
            )}
          </div>
        </div>
        <div className="bg-grays flex p-5 items-center border-t-2">
          <p className="flex-1">Bulk Action:</p>
          <button
            onClick={toggleMultiple}
            className="bg-blue text-white select-none py-1 px-5 rounded-md me-2"
          >
            Detail
          </button>
          <button
            onClick={removeMultiple}
            className="bg-red text-white select-none py-1 px-5 rounded-md"
          >
            Remove
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
