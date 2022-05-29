import * as React from "react";
import { createRoot } from "react-dom/client";

window.addEventListener("load", (): void => {
    const main: Element | null = window.document.querySelector("main#app");

    if (main instanceof Element) {
        createRoot(main).render(<p>Hello, world!</p>);
    } else {
        throw new Error("Something went wrong.");
    }
});
