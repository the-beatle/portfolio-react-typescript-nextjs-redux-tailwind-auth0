import React, {useRef, useEffect} from "react";
import {select, hierarchy, tree, linkHorizontal} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import { useForm } from "../hooks/useForm";

function ContactForm() {
    const nameRef = useRef<any>(null);
    const emailRef = useRef<any>(null);
    const messageRef = useRef<any>(null);

    async function loginUserCallback() {
        // send "values" to database
    }

    const initialState = {
        name: "",
        email: "",
        message:""
    };

    // getting the event handlers from our custom hook
    const { onChange, onSubmit, values } = useForm(
        loginUserCallback,
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
                                htmlFor={"name"}>
                                Name
                            </label>
                            <input
                                name='email'
                                id='name'
                                type='text'
                                placeholder='Name'
                                onChange={onChange}
                                required
                            />
                            <label
                                className={""}
                                htmlFor={"email"}>
                                Email
                            </label>
                            <input
                                name='email'
                                id='email'
                                type='email'
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
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;