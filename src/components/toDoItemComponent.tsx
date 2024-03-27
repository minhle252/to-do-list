import { ToDoItem } from "@/service/styles";
import React, { useState } from "react";
import { memo } from "react";
import { useId } from "react";
import FormTaskComponent from "./formTaskComponent";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, togleFormTask } from "@/redux/todoList/toDoSlice";
import { toast } from "react-toastify";
import CONSTANTS from "@/service/constants";

const TodoItemComponent: React.FC<ToDoItem> = ({item,selectedItem,valueChecked,changeEvent}) => {
  const dispatch = useDispatch();
  const vegetableSelectId = useId();
  // remove to do item
  const removeTodoHandler = ()=>{
      let text = "do you want to delete it?";
      if (confirm(text) == true) {
        dispatch(removeTodo({id: item.id}))
        CONSTANTS.showToastFunc('Delete to do item successfully', 'success')
      }
    
  }
  // Show/Hide form task
  const setTogleFormTask = ()=>{
    dispatch(togleFormTask([item.id]))
  }

  return (  
    <>
      <div>
        <div className="flex items-center select-none w-full border border-2 border-gray-600 mt-5 p-3 cursor-pointer">
          <label htmlFor={vegetableSelectId} className="flex-1 ">
            <input id={vegetableSelectId} value={valueChecked} onChange={changeEvent} checked={selectedItem} type="checkbox" className="w-[15px]" />
            <span className="ms-3 select-none">{item.name}</span>
          </label>
          <div className="flex justify-end items-center cursor-pointer">
            <button onClick={setTogleFormTask} className="bg-blue text-white select-none py-1 px-5 rounded-md me-2">Detail</button>
            <button onClick={removeTodoHandler} className="bg-red text-white select-none py-1 px-5 rounded-md">Remove</button>
          </div>
        </div>
        <div className="border border-t-0 border-2 border-gray-600 p-3" style={{display: (item.selected?'block':'none')}}>
          <FormTaskComponent
            btnText="Update"
            data={item}
          />
        </div>
      </div>
    </>
  );
};

export default memo(TodoItemComponent);
