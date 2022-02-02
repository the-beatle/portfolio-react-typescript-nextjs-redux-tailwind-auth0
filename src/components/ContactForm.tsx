import React, {useRef, useEffect} from "react";
import {select, hierarchy, tree, linkHorizontal} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import {useForm} from "../hooks/useForm";
import {useSelector, useDispatch} from "react-redux";
import {sendMessage} from "../slices/contactSlice";

function ContactForm() {
    const {data, error, loading} = useSelector((state: any) => state.contact)
    const dispatch = useDispatch()

    const initialState = {
        email: "",
        message: ""
    };


    async function sendMessageCallback() {
        dispatch(sendMessage(values))
    }

    // getting the event handlers from our custom hook
    const {onChange, onSubmit, values} = useForm(
        sendMessageCallback,
        initialState
    );

    return (
        <div className={"text-blue text-xl flex justify-center"}>
            <div className={""}>
                <div className={"text-white"}>
                    <div>
                        CONTACT ME!
                    </div>
                </div>
                <div className={"w-full max-w-xs "}>
                    <form onSubmit={onSubmit} className={"rounded px-8 pt-6 pb-8 mb-4 "}>
                        <div className={"mb-4"}>
                            <label
                                className={"block font-bold mb-2 text-red-400"}
                                htmlFor={"email"}>
                                Email
                            </label>
                            <input
                                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                name='email'
                                id='email'
                                type='text'
                                placeholder='email'
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className={"mb-6"}>
                            <label
                                className={"block font-bold mb-2 text-red-400"}
                                htmlFor={"message"}>
                                Message
                            </label>
                            <textarea
                                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                name='message'
                                id='message'
                                placeholder='message'
                                onChange={onChange}
                                required
                            />
                        </div>

                        <button className={"w-full bg-green-400"} type='submit'>Send</button>
                        <div className={"text-red-200 mt-4"}>
                            {data && (
                                <div>
                                    <div className={"text-blue-500"}>
                                        {"The message was successfully sent!"}
                                    </div>
                                    <div>
                                        {"Please check out your email"}
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;