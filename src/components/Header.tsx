import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkHorizontal } from "d3";
import useResizeObserver from "../hooks/useResizeObserver";

function Header() {
    const {welcomeText, title, subTitle} = {
        welcomeText: "Hello world",
        title: "I'm Mario",
        subTitle: "Data Scientist and Web Developer"
    }
    return (
        <div className="">
            <h3 className="text-5xl font-custom1 text-blue-400">
                {welcomeText}
            </h3>
            <h3 className="text-5xl font-custom1 text-green-600">
                {title}
            </h3>
            <h3 className="text-2xl font-custom1 text-yellow-300">
                {subTitle}
            </h3>
        </div>
);
}

export default Header;