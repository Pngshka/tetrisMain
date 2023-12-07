import React, {useCallback, createContext} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import Form from "../baseComponents/gui/form/Form";
import LabelInput from "../baseComponents/gui/form/LabelInput";
import requests, {useRequestData} from "../../redux/reducer/requests";
import {name, message, password} from "../../constants/form";

//slots, errors, register, div
export const ThemeContext = createContext(null);

export default function CustForm() {
  const form = useForm();

  const action = requests.thunks.form;

  const requestName = action?.typePrefix ?? "";
  const dispatch = useDispatch();
  const {request} = useRequestData(requestName);
  const clearError = useCallback((field) => {
    dispatch(
      requests.actions.clearError({
        field,
        requestName,
      })
    ),
      [action];
  });
  const onSubmit = useCallback((data) => {

    fetch("ssdd", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {

        const form = document.querySelector('.login')
        // console.log(form.score)
        form.style.display = 'none';

        fetch('getResult').then((response) => {
        });

      });
  }, [action]);

  const slots = {
    inputs: [
      <LabelInput
        label={<div className={"input__name"}>Name: </div>}
        name={"name"}
      />,
    ],
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      className="login"
      slots={slots}
      errors={{
        clearError,
        errors: request?.error?.fields,
      }}
      as={FormWrapper}
    >
      <button type="submit" id="myButton">
        Отправить
      </button>
      <button type="submit" id="continuePlaying">
        Продолжить играть
      </button>
    </Form>
  );
}

function FormWrapper({slots, children, ...etc}) {
  return (
    <form {...etc}>
      <div>{slots.inputs}</div>
      {children}
    </form>
  );
}
