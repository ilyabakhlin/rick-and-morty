import React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./Components/Application";

window.addEventListener("load", (): void => {
    const main: Element | null = window.document.querySelector("main#app");

    if (main instanceof Element) {
        createRoot(main).render(<Application/>);
    } else {
        throw new Error("Something went wrong.");
    }
});
