import React, {useCallback, createContext} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import Form from "../baseComponents/gui/form/Form";
import LabelInput from "../baseComponents/gui/form/LabelInput";
import requests, {useRequestData} from "../../redux/reducer/requests";

//slots, errors, register, div
export const ThemeContext = createContext(null);

export default function CustForm() {
    const form = useForm();

    const action = requests.thunks.setResult;
    // const action2 = requests.thunks.form2;

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
      const form = document.querySelector('.login')
      dispatch(action({name: data.name, score: form.score}))
    }, [action])
    // const onSubmit = useCallback((data) => {
    //     const form = document.querySelector('.login')
    //
    //     fetch("setResult", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({name: data.name, score: form.score}),
    //     })
    //         .then(async (response) => {
  //const form = document.querySelector('.login')
    //             form.reset();
    //             form.style.display = 'none';
    //
    //             fetch('getResult').then(async (response) => {
    //                 let str="";
    //                 const div = document.querySelector('.div')
    //                 div.style.display = 'block';
    //
    //                 let data = await response.json()
    //                 console.log(data)
    //                 for (let i = 0; i < ((data.length < 10) ? data.length : 10); i++) {
    //                     str += ("<br>" + `${data[i].name}` + ": " + `${data[i].score}` + "</br>")
    //                 }
    //                 div.innerHTML = str
    //             });
    //         });
    //
    // }, [action]);

    const slots = {
        inputs: [
            <LabelInput
                label={<div className={"input__name"}>Name: </div>}
                name={"name"}
                // rules={name()}
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
