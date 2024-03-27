import { FormTask } from "@/service/styles";
import React, { useEffect, useState } from "react";
import InputComponent from "./inputComponent";
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo } from "@/redux/todoList/toDoSlice";
import { uid } from 'uid';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import CONSTANTS from "@/service/constants";
const FormTaskComponent: React.FC<FormTask> = ({
  btnText,
  clickEvent,
  data,
}) => {
  const dispatch = useDispatch();
  const [listPiority, setListPiority] = useState([
    { label: "nomal", selected: true, name: "nomal" },
    { label: "low", selected: false, name: "low" },
    { label: "hight", selected: false, name: "hight" },
  ]);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [piority, setPiority] = useState("nomal");
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    if (data) {
      setName(data.name);
      setDes(data.des);
      setPiority(data.piority);
      changeListPiority()
      data.dueDate && data.dueDate != ""
        ? setStartDate(new Date(data.dueDate))
        : setStartDate(new Date());
    }
  }, [data]);
  const changeListPiority = ()=>{
    let listPiNew = listPiority.map((item:any) =>{
      if(data.piority == item.label){
        item.selected = true;
      }else{
        item.selected = false;
      }
      return item;
    })
    setListPiority(listPiNew)
  }
  const changePiorityHandler = (data: string) => {
    setPiority(data);
  };
  // send form task 
  const submitHandler = () => {
    let dataForm = {
      id: '',
      showView: true,
      name,
      des,
      piority,
      dueDate: `${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}`,
      selected: false,
    };
    if(!name || !des) {
      validateFormTask(name,'Name');
      validateFormTask(des,'Description');
      return false;
    }
    if(!data){
      dataForm.id = uid();
      dispatch(addTodo(dataForm));
      setName('');
      setDes('');
      setPiority('nomal');
      setStartDate(new Date());
      CONSTANTS.showToastFunc('Added successfull!','success');
    }else{
      dataForm.id = data.id;
      dispatch(updateTodo(dataForm));
      CONSTANTS.showToastFunc('Updated successfull!','success');
    }
  };
  
  // Validate form
  const validateFormTask = (value:string, name:string)=>{
    if(!value){
      CONSTANTS.showToastFunc(`${name} is empty!`,'error');
      return false;
    }
  }
  return (
    <>
      <input
        type="text"
        placeholder="Add new task..."
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        className="w-full px-2 py-1 "
      />
      <div className="mt-5">
        <label htmlFor="des" className="font-bold mb-1">
          Description
        </label>
        <textarea
          id="des"
          onChange={(e: any) => setDes(e.target.value)}
          className="w-full px-2 py-1 h-32"
          value={des}
        ></textarea>
      </div>
      <div className="flex w-full justify-between mb-5">
        <InputComponent
          title="Due date"
          typeInput="date"
          valueInput={startDate}
          onchangeEvent={(date: any) => setStartDate(date)}
        />
        <InputComponent
          title="Piority"
          typeInput="select"
          listOption={listPiority}
          valueInput={piority}
          onchangeEvent={(event: any) =>
            changePiorityHandler(event.target.value)
          }
        />
      </div>
      <button
        type="button"
        onClick={submitHandler}
        className="text-center w-full bg-green text-white py-1 rounded-md"
      >
        {btnText}
      </button>
    </>
  );
};

export default memo(FormTaskComponent);
