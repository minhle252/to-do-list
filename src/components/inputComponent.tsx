"cl";
import { InputField } from "@/service/styles";
import React, { useEffect, useState } from "react";
import { useId } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
const InputComponent: React.FC<InputField> = ({
  title,
  typeInput,
  valueInput,
  onchangeEvent,
  listOption
}) => {
  const vegetableSelectId = useId();
  const listSelect = () => {
    if (typeInput == "textArea") {
      return (
        <textarea
          id="des"
          className="w-full px-2 py-1 h-32"
          onChange={onchangeEvent}
        >
          {valueInput}
        </textarea>
      );
    } else if (typeInput == "date") {
      return (
        <DatePicker
          showIcon
          selected={valueInput}
          className="w-full"
          onChange={onchangeEvent}
        />
      );
    } else if (typeInput == "select") {
      return (
        <select
          id={vegetableSelectId}
          value={valueInput}
          onChange={onchangeEvent}
          className="w-full"
        >
          {listOption?.map((item: any, index: number) => {
            return (
              <option key={item?.label + index} value={item?.label}>
                {item?.name}
              </option>
            );
          })}
        </select>
      );
    }
  };
  return (
    <div className="box_date w-[47%]">
      <label htmlFor={vegetableSelectId} className="block font-bold mb-1">
        {title}
      </label>
      {listSelect()}
    </div>
  );
};

export default InputComponent;
