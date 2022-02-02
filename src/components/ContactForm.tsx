import React, {useRef, useEffect} from "react";
import {select, hierarchy, tree, linkHorizontal} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import {useForm} from "../hooks/useForm";
import {useSelector,useDispatch} from "react-redux";
import { sendMessage } from "../slices/contactSlice";

function ContactForm() {
    const {data, error, loading} = useSelector((state: any) => state.contact)
    const dispatch = useDispatch()

    const initialState = {
        email: "",
        message: ""
    };


    async function sendMessageCallback() {
        console.log(values)
        dispatch(sendMessage(values))
    }

    // getting the event handlers from our custom hook
    const {onChange, onSubmit, values} = useForm(
        sendMessageCallback,
        initialState
    );

    return (
        <div className={"text-blue text-xl"}>
            <div className={""}>
                <div className={""}>
                    <div>
                        CONTACT ME!
                    </div>
                </div>
                <div className={"text-lg border border-white"}>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label
                                className={""}
                                htmlFor={"email"}>
                                Email
                            </label>
                            <input
                                name='email'
                                id='email'
                                type='text'
                                placeholder='email'
                                onChange={onChange}
                                required
                            />
                            <label
                                className={""}
                                htmlFor={"message"}>
                                Message
                            </label>
                            <input
                                name='message'
                                id='message'
                                type=''
                                placeholder='message'
                                onChange={onChange}
                                required
                            />
                            <button type='submit'>Send</button>
                            <div className={"text-red-200"}>
                                {data && <div>{JSON.stringify(data)}</div>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;